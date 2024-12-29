import { Post } from '@app/post'
import { PostCategory } from '@app/post-category'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Breadcrumb {
  @Field(() => Post, { nullable: true })
  post?: Post

  @Field(() => PostCategory, { nullable: true })
  category: PostCategory
}