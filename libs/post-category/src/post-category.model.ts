import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PostCategory {
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

  @Field(() => [PostCategory], { nullable: true })
  children?: [PostCategory]
}

@InputType()
export class PostCategoryCreate {
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
export class PostCategoryUpdate {
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