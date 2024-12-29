import { Field, InputType, ObjectType } from '@nestjs/graphql'
@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  now: Date

  @Field()
  login: string

  @Field()
  password: string

  @Field({ nullable: true })
  email: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string
}

@InputType()
export class UserUpdate {
  @Field()
  id: string

  @Field({ nullable: true })
  avatar?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string
}