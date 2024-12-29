
import { GQLDirectives } from '@app/graphql/graphql.types'
import { Args, Directive, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileManager, FolderCreate } from './file-manager.model'
import { FileManagerService } from './file-manager.service'

@Resolver(FileManager)
export class FileManagerResolver {
  constructor(
    private fileManagerService: FileManagerService
  ) { }

  @Directive(GQLDirectives.isAuth)
  @Mutation(() => FileManager)
  async createFolder(@Args('folder') folder: FolderCreate) {
    return await this.fileManagerService.createFolder(folder)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => [FileManager], { nullable: true })
  async getListByParentId(@Args('parentId', { nullable: true }) parentId?: string) {
    return await this.fileManagerService.getByParentId(parentId)
  }

  @Directive(GQLDirectives.isAuth)
  @Query(() => [FileManager], { nullable: true })
  async getFileManagerAllParents(@Args('parentId', { nullable: true }) parentId?: string) {
    return await this.fileManagerService.getAllParents(parentId)
  }
  @Directive(GQLDirectives.isAuth)
  @Mutation(() => String, { nullable: true })
  async removeFile(@Args('id') id: string) {
    return await this.fileManagerService.delete(id)
  }
} 