
import { GQLContext, GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Context, Directive, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { User, UserUpdate } from './user.model'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {

  constructor(
    private userService: UserService
  ) { }

  @ResolveField()
  async now() {
    return new Date
  }

  // @Directive(GQLDirectives.isAuth)
  @Query(() => User, { nullable: true })
  async me(@Context() ctx: GQLContext) {
    return ctx.user
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => User, { nullable: true })
  async updateUser(@Args('user') user: UserUpdate) {
    return await this.userService.update(user)
  }
}