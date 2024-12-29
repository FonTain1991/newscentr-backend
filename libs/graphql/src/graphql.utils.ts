import { AuthService } from '@app/auth'
import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { DirectiveLocation, GraphQLDirective, GraphQLError, GraphQLSchema, defaultFieldResolver } from 'graphql'
import { GQLContext, GQLDirectives } from './graphql.types'

function transformSchema(schema: GraphQLSchema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      for (const directiveName of Object.values(GQLDirectives)) {
        const directive = getDirective(
          schema,
          fieldConfig,
          directiveName.replace('@', '')
        )?.[0]

        if (directive) {
          if (directiveName === GQLDirectives.isAuth) {
            const { resolve = defaultFieldResolver } = fieldConfig

            fieldConfig.resolve = async function (source, args, context: GQLContext, info) {
              if (!context.user) {
                throw new GraphQLError('FORBIDDEN')
              }
              return await resolve(source, args, context, info)
            }
            return fieldConfig
          }
        }
      }
    }
  })
}

export function useFactory(cfg: ConfigService, authService: AuthService): ApolloDriverConfig {
  return {
    path: cfg.getOrThrow('GRAPHQL_PATH'),
    subscriptions: {
      'graphql-ws': {
        path: cfg.getOrThrow('GRAPHQL_PATH_WS')
      }
    },
    formatError(formattedError, error) {
      console.error(error)

      if (error instanceof GraphQLError) {
        if (error.originalError instanceof PrismaClientKnownRequestError) {
          if (error.originalError.code === 'P2025') {
            return {
              message: 'USER_NOT_FOUND'
            }
          }
        }
      }

      return formattedError
    },
    autoSchemaFile: true,
    allowBatchedHttpRequests: true,
    playground: cfg.get('GRAPHQL_PLAYGROUND') ? {
      settings: {
        'request.credentials': 'include',
      }
    } : false,
    transformSchema: transformSchema,
    buildSchemaOptions: {
      directives: Object.values(GQLDirectives).map(name => {
        return new GraphQLDirective({
          name: name.replace('@', ''),
          locations: [DirectiveLocation.FIELD_DEFINITION],
        })
      })
    },
    async context({ req, res }): Promise<GQLContext> {
      return {
        req,
        res,
        user: await authService.findUserByToken(req?.cookies?.token || '')
      }
    }
  }
}
