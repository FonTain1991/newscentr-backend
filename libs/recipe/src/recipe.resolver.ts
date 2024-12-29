
import { GQLDirectives } from '@app/graphql/graphql.types'
import { RecipeCategory, RecipeCategoryService } from '@app/recipe-category'
import { RecipeIngredient, RecipeIngredientService } from '@app/recipe-ingredient'
import { Args, Directive, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Recipe, RecipeCreate, RecipeUpdate } from './recipe.model'
import { RecipeService } from './recipe.service'
@Resolver(Recipe)
export class RecipeResolver {
  constructor(
    private recipeService: RecipeService,
    private recipeIngredientService: RecipeIngredientService,
    private recipeCategoryService: RecipeCategoryService,
  ) { }

  // @Directive(GQLDirectives.isAuth)
  @Query(() => [Recipe], { nullable: true })
  async getRecipes() {
    return await this.recipeService.getAll()
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Recipe, { nullable: true })
  async createRecipe(@Args('recipe') recipe: RecipeCreate) {
    return await this.recipeService.create(recipe)
  }

  @Query(() => Recipe, { nullable: true })
  async getRecipeById(@Args('id') id: string) {
    return await this.recipeService.getById(id)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Recipe, { nullable: true })
  async updateRecipe(@Args('recipe') recipe: RecipeUpdate) {
    return await this.recipeService.update(recipe)
  }

  @ResolveField(() => [RecipeIngredient])
  async ingredients(@Parent() parent: Recipe) {
    return await this.recipeIngredientService.getByRecipeId(parent?.id)
  }

  @Query(() => [Recipe], { nullable: true })
  async getLatestRecipes(
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return await this.recipeService.getAll({
      take: take ?? 10,
      skip: cursor ? 1 : 0,
      cursor: cursor ? {
        id: cursor
      } : undefined
    })
  }

  @Query(() => Recipe)
  async getCountRecipes() {
    return await this.recipeService.countAll()
  }

  @ResolveField(() => RecipeCategory)
  async rubric(@Parent() parent: Recipe) {
    return await this.recipeCategoryService.getById(parent?.recipeCategoryId)
  }

  @Query(() => Recipe, { nullable: true })
  async getRecipeByUrl(
    @Args('url') url: string,
    @Args('recipeCategoryUrl') recipeCategoryUrl: string,
  ) {
    return await this.recipeService.getByUrl({ url, recipeCategoryUrl })
  }

  @Query(() => [Recipe], { nullable: true })
  async getRecipesByRecipeCategoryUrl(@Args('url') url: string) {
    return await this.recipeService.getRecipesByRecipeCategoryUrl(url)
  }

  @Mutation(() => [Recipe], { nullable: true })
  async updateRecipeCountSee(@Args('url') url: string) {
    return await this.recipeService.updateCountSee(url)
  }
}