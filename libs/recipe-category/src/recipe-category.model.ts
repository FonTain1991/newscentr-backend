import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RecipeCategory {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  url: string

  @Field({ nullable: true })
  parentId?: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  text?: string

  @Field(() => [RecipeCategory])
  children?: [RecipeCategory]
}

@InputType()
export class RecipeCategoryCreate {
  @Field()
  name: string

  @Field()
  url: string

  @Field({ nullable: true })
  parentId?: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  text?: string
}

@InputType()
export class RecipeCategoryUpdate {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  url: string

  @Field({ nullable: true })
  parentId?: string

  @Field({ nullable: true })
  keywords?: string

  @Field()
  description?: string

  @Field({ nullable: true })
  text?: string
}