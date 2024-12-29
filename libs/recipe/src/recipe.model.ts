import { RecipeCategory } from '@app/recipe-category'
import { RecipeIngredient } from '@app/recipe-ingredient'
import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Recipe {
  @Field()
  id: string

  @Field()
  pageName: string

  @Field()
  pageTitle: string

  @Field()
  url: string

  @Field()
  text: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field()
  isPublish: boolean

  @Field()
  recipeCategoryId: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field(() => [RecipeIngredient])
  ingredients?: RecipeIngredient[]

  @Field({ nullable: true })
  totalCookingTime?: Date

  @Field({ nullable: true })
  activeCookingTime?: Date

  @Field(() => RecipeCategory)
  rubric: RecipeCategory

  @Field()
  countSee: number

  @Field()
  total: number
}

@InputType()
export class RecipeCreate {
  @Field()
  pageName: string

  @Field()
  pageTitle: string

  @Field()
  url: string

  @Field()
  text: string

  @Field({ nullable: true })
  isPublish?: boolean

  @Field()
  recipeCategoryId: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field({ nullable: true })
  ingredients?: string

  @Field({ nullable: true })
  totalCookingTime?: Date

  @Field({ nullable: true })
  activeCookingTime?: Date
}

@InputType()
export class RecipeUpdate {
  @Field()
  id: string

  @Field()
  pageName: string

  @Field()
  pageTitle: string

  @Field()
  url: string

  @Field()
  text: string

  @Field({ nullable: true })
  isPublish?: boolean

  @Field()
  recipeCategoryId: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field({ nullable: true })
  ingredients?: string

  @Field({ nullable: true })
  totalCookingTime?: Date

  @Field({ nullable: true })
  activeCookingTime?: Date
}