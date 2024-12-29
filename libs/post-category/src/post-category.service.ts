import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { PostCategoryCreate, PostCategoryUpdate } from './post-category.model'
import { tree } from 'utils/tree'
import { PostCategory } from '@prisma/client'

@Injectable()
export class PostCategoryService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async create(params: PostCategoryCreate) {
    return await this.prismaService.postCategory.create({
      data: {
        name: params.name,
        keywords: params?.keywords,
        description: params?.description,
        url: params.url,
        parentId: params.parentId,
        text: params?.text
      }
    })
  }

  async getById(id: string) {
    return await this.prismaService.postCategory.findFirst({
      where: { id }
    })
  }

  async getAll() {
    return await this.prismaService.postCategory.findMany()
  }

  async update(params: PostCategoryUpdate) {
    return await this.prismaService.postCategory.update({
      where: { id: params.id },
      data: {
        name: params.name,
        keywords: params?.keywords,
        description: params?.description,
        url: params.url,
        parentId: params.parentId,
        text: params?.text
      }
    })
  }

  async getByUrl(url: string) {
    return await this.prismaService.postCategory.findFirst({
      where: { url }
    })
  }

  async getAllTree() {
    const items = await this.prismaService.postCategory.findMany()
    return tree({ items, foreignKey: 'id', targetKey: 'parentId', parent: null })
  }

  async getWithParents(url: string): Promise<PostCategory[]> {
    return await this.prismaService.$queryRaw`
      WITH RECURSIVE
        "R" AS (
        SELECT
          *
        FROM
          "PostCategory" AS "t"
        WHERE
          "url" = ${url}
        UNION ALL
        SELECT
          "M".*
        FROM
          "PostCategory" "M"
          JOIN "R" ON "M"."parentId" = "R"."id"
      )
      SELECT * FROM "R"`
  }

  async getAllForXml() {
    return await this.prismaService.postCategory.findMany({
      select: {
        url: true,
        createdAt: true
      }
    })
  }
}
