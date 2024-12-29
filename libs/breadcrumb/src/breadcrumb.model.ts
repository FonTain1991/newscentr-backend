import { Post } from '@app/post'
import { PostCategory } from '@app/post-category'
import { Recipe } from '@app/recipe'
import { RecipeCategory } from '@app/recipe-category'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Breadcrumb {
  @Field(() => Recipe || Post, { nullable: true })
  post?: Recipe | Post

  @Field(() => RecipeCategory || PostCategory, { nullable: true })
  category: RecipeCategory | PostCategory
}