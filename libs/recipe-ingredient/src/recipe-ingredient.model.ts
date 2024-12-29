import { Ingredient } from '@app/ingredient'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RecipeIngredient {
  @Field({ nullable: true })
  id?: string

  @Field()
  ingredientId: string

  @Field({ nullable: true })
  value: string

  @Field({ nullable: true })
  note?: string

  @Field(() => Ingredient)
  ingredient: Ingredient
}