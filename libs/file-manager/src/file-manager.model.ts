import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { FileManagerType } from '@prisma/client'

registerEnumType(FileManagerType, {
  name: 'FileManagerType'
})

@ObjectType()
export class FileManager {
  @Field()
  id: string

  @Field(() => FileManagerType)
  type: FileManagerType

  @Field({ nullable: true })
  value?: string

  @Field({ nullable: true })
  parentId?: string

  @Field({ nullable: true })
  name: string

  @Field()
  order: number
}

@InputType()
export class FolderCreate {
  @Field()
  name: string

  @Field({ nullable: true })
  parentId?: string
}