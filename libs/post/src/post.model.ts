import { Field, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Post {
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
  postCategoryId: string

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

  @Field()
  total: number

  @Field()
  countSee: number
}

@InputType()
export class PostCreate {
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
  postCategoryId: string

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
}

@InputType()
export class PostUpdate {
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
  postCategoryId: string

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
}