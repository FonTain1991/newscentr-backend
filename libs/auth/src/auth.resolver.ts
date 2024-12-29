
import { GQLContext, GQLDirectives } from '@app/graphql/graphql.types'
import { User } from '@app/user'
import { Args, Context, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthRegistration } from './auth.model'

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService
  ) { }

  @Query(() => String, { nullable: true })
  async checkRecoveryToken(@Args('token') token: string) {
    await this.authService.checkRecoveryToken(token)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => User)
  async signOut(@Context() ctx: GQLContext) {
    return await this.authService.signOut(ctx)
  }

  @Mutation(() => User)
  async signIn(@Context() ctx: GQLContext, @Args('email') email: string, @Args('password') password: string) {
    return await this.authService.signIn(email, password, ctx)
  }

  @Mutation(() => String, { nullable: true })
  async recoveryPassword(@Args('email') email: string) {
    await this.authService.recoveryPassword(email)
  }

  @Mutation(() => String, { nullable: true })
  async setNewPassword(@Args('token') token: string, @Args('password') password: string, @Args('password2') password2: string) {
    await this.authService.setNewPassword(token, password, password2)
  }

  @Mutation(() => User)
  async registration(
    @Context() ctx: GQLContext,
    @Args('auth') auth: AuthRegistration
  ) {
    return await this.authService.register(auth, ctx)
  }
} 