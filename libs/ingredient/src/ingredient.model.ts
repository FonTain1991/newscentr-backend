import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Ingredient {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field({ nullable: true })
  iconId?: string

  @Field({ nullable: true })
  parentId?: string

  @Field(() => [Ingredient], { nullable: true })
  children?: [Ingredient]
}

@InputType()
export class IngredientCreate {
  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field({ nullable: true })
  iconId?: string

  @Field({ nullable: true })
  parentId?: string
}

@InputType()
export class IngredientUpdate {
  @Field()
  id: string

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  previewId?: string

  @Field({ nullable: true })
  previewAlt?: string

  @Field({ nullable: true })
  previewTitle?: string

  @Field({ nullable: true })
  iconId?: string

  @Field({ nullable: true })
  parentId?: string
}