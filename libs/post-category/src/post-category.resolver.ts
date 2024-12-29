
import { GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PostCategory, PostCategoryCreate, PostCategoryUpdate } from './post-category.model'
import { PostCategoryService } from './post-category.service'

@Resolver(PostCategory)
export class PostCategoryResolver {
  constructor(
    private postCategoryService: PostCategoryService
  ) { }

  @Directive(GQLDirectives.isAuth)
  @Query(() => [PostCategory], { nullable: true })
  async getPostCategory() {
    return await this.postCategoryService.getAll()
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => PostCategory, { nullable: true })
  async createPostCategory(@Args('category') category: PostCategoryCreate) {
    return await this.postCategoryService.create(category)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => PostCategory, { nullable: true })
  async getPostCategoryById(@Args('id') id: string) {
    return await this.postCategoryService.getById(id)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => PostCategory, { nullable: true })
  async updatePostCategory(@Args('category') category: PostCategoryUpdate) {
    return await this.postCategoryService.update(category)
  }

  @Query(() => [PostCategory])
  async getPostCategories() {
    return await this.postCategoryService.getAllTree()
  }

  @Query(() => PostCategory, { nullable: true })
  async getPostCategoryByUrl(@Args('url') url: string) {
    return await this.postCategoryService.getByUrl(url)
  }
}