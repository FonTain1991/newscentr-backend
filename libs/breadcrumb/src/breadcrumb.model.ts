import { PostCategory } from '@app/post-category'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Breadcrumb {
  @Field(() => PostCategory, { nullable: true })
  category: PostCategory
}