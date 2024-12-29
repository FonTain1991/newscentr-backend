
import { GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RecipeCategory, RecipeCategoryCreate, RecipeCategoryUpdate } from './recipe-category.model'
import { RecipeCategoryService } from './recipe-category.service'

@Resolver(RecipeCategory)
export class RecipeCategoryResolver {
  constructor(
    private recipeCategoryService: RecipeCategoryService
  ) { }

  // @Directive(GQLDirectives.isAuth)
  @Query(() => [RecipeCategory], { nullable: true })
  async getRecipeCategory() {
    return await this.recipeCategoryService.getAll()
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => RecipeCategory, { nullable: true })
  async createRecipeCategory(@Args('category') category: RecipeCategoryCreate) {
    return await this.recipeCategoryService.create(category)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => RecipeCategory, { nullable: true })
  async getRecipeCategoryById(@Args('id') id: string) {
    return await this.recipeCategoryService.getById(id)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => RecipeCategory, { nullable: true })
  async updateRecipeCategory(@Args('category') category: RecipeCategoryUpdate) {
    return await this.recipeCategoryService.update(category)
  }

  @Query(() => [RecipeCategory])
  async getRecipeCategories() {
    return await this.recipeCategoryService.getAllTree()
  }

  @Query(() => RecipeCategory, { nullable: true })
  async getRecipeCategoryByUrl(@Args('url') url: string) {
    return await this.recipeCategoryService.getByUrl(url)
  }
}