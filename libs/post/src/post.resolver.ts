
import { GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Directive, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { Post, PostCreate, PostUpdate } from './post.model'
import { PostService } from './post.service'
import { PostCategory, PostCategoryService } from '@app/post-category'

@Resolver(Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private postCategoryService: PostCategoryService,
  ) { }

  // @Directive(GQLDirectives.isAuth)
  @Query(() => [Post], { nullable: true })
  async getPosts() {
    return await this.postService.getAll()
  }

  @Query(() => [Post], { nullable: true })
  async getPostsIsPublish() {
    console.log('qew')
    return await this.postService.getAll({
      where: {
        isPublish: true
      }
    })
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Post, { nullable: true })
  async createPost(@Args('post') post: PostCreate) {
    return await this.postService.create(post)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => Post, { nullable: true })
  async getPostById(@Args('id') id: string) {
    return await this.postService.getById(id)
  }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => Post, { nullable: true })
  async updatePost(@Args('post') post: PostUpdate) {
    return await this.postService.update(post)
  }

  @Mutation(() => Post, { nullable: true })
  async updatePostCountSee(@Args('url') url: string) {
    return await this.postService.updateCountSee(url)
  }
  @Query(() => Post, { nullable: true })
  async getCountPosts() {
    return await this.postService.countAll()
  }

  @ResolveField(() => PostCategory)
  async rubric(@Parent() parent: Post) {
    return await this.postCategoryService.getById(parent?.postCategoryId)
  }

  @Query(() => Post, { nullable: true })
  async getPostByUrl(
    @Args('url') url: string,
    @Args('postCategoryUrl') postCategoryUrl: string,
  ) {
    return await this.postService.getByUrl({ url, postCategoryUrl })
  }

  @Query(() => [Post], { nullable: true })
  async getPostByPostCategoryUrl(@Args('url') url: string) {
    return await this.postService.getPostsByPostCategoryUrl(url)
  }

  @Query(() => [Post], { nullable: true })
  async getLatestPosts(
    @Args('cursor', { nullable: true }) cursor?: string,
    @Args('take', { nullable: true }) take?: number,
  ) {
    return await this.postService.getAll({
      where: {
        isPublish: true
      },
      take: take ?? 10,
      skip: cursor ? 1 : 0,
      cursor: cursor ? {
        id: cursor
      } : undefined
    })
  }
} 