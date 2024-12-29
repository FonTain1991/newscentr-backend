import { Field, InputType } from '@nestjs/graphql'
@InputType()
export class AuthRegistration {
  @Field()
  confirmPassword: string

  @Field()
  password: string

  @Field()
  email: string
} 