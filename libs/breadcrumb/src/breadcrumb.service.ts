import { PostService } from '@app/post'
import { PostCategoryService } from '@app/post-category'
import { RecipeService } from '@app/recipe'
import { RecipeCategoryService } from '@app/recipe-category'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BreadcrumbService {
  constructor(
    private recipeCategoryService: RecipeCategoryService,
    private recipeService: RecipeService,
    private postCategoryService: PostCategoryService,
    private postService: PostService,
  ) { }

  async get(params: string) {
    const [categoryUrl, postUrl] = JSON.parse(params)

    let post
    if (postUrl) {
      post = await this.getPostByUrl(postUrl, categoryUrl)
    }

    const category = await this.getCategoryByUrl(categoryUrl)
    return {
      category,
      post
    }
  }

  async getPostByUrl(url: string, categoryUrl: string) {
    const recipe = await this.recipeService.getByUrl({ url, recipeCategoryUrl: categoryUrl })
    if (recipe) {
      return recipe
    }
    return await this.postService.getByUrl({ url, postCategoryUrl: categoryUrl })
  }

  async getCategoryByUrl(url: string) {
    const recipe = await this.recipeCategoryService.getByUrl(url)
    if (recipe) {
      return recipe
    }
    return await this.postCategoryService.getByUrl(url)
  }
}
