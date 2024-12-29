
import { GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Ingredient, IngredientCreate, IngredientUpdate } from './ingredient.model'
import { IngredientService } from './ingredient.service'

@Resolver(Ingredient)
export class IngredientResolver {
  constructor(
    private ingredientService: IngredientService
  ) { }

  @Directive(GQLDirectives.isAuth)
  @Query(() => [Ingredient], { nullable: true })
  async getIngredients() {
    return await this.ingredientService.getAll()
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Ingredient, { nullable: true })
  async createIngredient(@Args('ingredient') ingredient: IngredientCreate) {
    return await this.ingredientService.create(ingredient)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => Ingredient, { nullable: true })
  async getIngredientById(@Args('id') id: string) {
    return await this.ingredientService.getById(id)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Ingredient, { nullable: true })
  async updateIngredient(@Args('ingredient') ingredient: IngredientUpdate) {
    return await this.ingredientService.update(ingredient)
  }
}