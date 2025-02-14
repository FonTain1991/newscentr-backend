import { AuthModule, AuthResolver, AuthService } from '@app/auth'
import { BreadcrumbModule, BreadcrumbResolver } from '@app/breadcrumb'
import { FileManagerModule, FileManagerResolver } from '@app/file-manager'
import { ImagesController, ImagesModule } from '@app/images'
import { PostModule, PostResolver } from '@app/post'
import { PostCategoryModule, PostCategoryResolver } from '@app/post-category'
import { SitemapXmlModule } from '@app/sitemap-xml'
import { UserModule, UserResolver } from '@app/user'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { useFactory } from './graphql.utils'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostCategoryModule,
    PostModule,
    ImagesModule,
    FileManagerModule,
    BreadcrumbModule,
    SitemapXmlModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [
        ConfigModule,
        AuthModule
      ],
      inject: [
        ConfigService,
        AuthService
      ],
      driver: ApolloDriver,
      useFactory: useFactory
    })
  ],
  controllers: [
    ImagesController
  ],
  providers: [
    AuthResolver,
    UserResolver,
    PostCategoryResolver,
    PostResolver,
    FileManagerResolver,
    BreadcrumbResolver
  ]
})
export class GraphqlModule { }
