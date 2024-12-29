import { PrismaService } from '@app/prisma'
import { SitemapXmlService } from '@app/sitemap-xml'
import { Injectable } from '@nestjs/common'
import { RecipeCategory } from '@prisma/client'
import { tree } from 'utils/tree'
import { RecipeCategoryCreate, RecipeCategoryUpdate } from './recipe-category.model'

@Injectable()
export class RecipeCategoryService {
  constructor(
    private prismaService: PrismaService,
    private sitemapXmlService: SitemapXmlService
  ) { }

  async create(params: RecipeCategoryCreate) {
    const recipeCategory = await this.prismaService.recipeCategory.create({
      data: {
        name: params.name,
        keywords: params?.keywords,
        description: params?.description,
        url: params.url,
        parentId: params.parentId,
        text: params?.text
      }
    })
    await this.sitemapXmlService.generate()
    return recipeCategory
  }

  async getById(id: string) {
    return await this.prismaService.recipeCategory.findFirst({
      where: { id }
    })
  }

  async getByUrl(url: string) {
    return await this.prismaService.recipeCategory.findFirst({
      where: { url }
    })
  }

  async getAll() {
    return await this.prismaService.recipeCategory.findMany()
  }

  async update(params: RecipeCategoryUpdate) {
    const recipeCategory = await this.prismaService.recipeCategory.update({
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
    await this.sitemapXmlService.generate()
    return recipeCategory
  }

  async getAllTree() {
    const items = await this.prismaService.recipeCategory.findMany()
    return tree({ items, foreignKey: 'id', targetKey: 'parentId', parent: null })
  }

  async getWithParents(url: string): Promise<RecipeCategory[]> {
    return await this.prismaService.$queryRaw`
      WITH RECURSIVE
        "R" AS (
        SELECT
          *
        FROM
          "RecipeCategory" AS "t"
        WHERE
          "url" = ${url}
        UNION ALL
        SELECT
          "M".*
        FROM
          "RecipeCategory" "M"
          JOIN "R" ON "M"."parentId" = "R"."id"
      )
      SELECT * FROM "R"`
  }

  async getAllForXml() {
    return await this.prismaService.recipeCategory.findMany({
      select: {
        url: true,
        createdAt: true
      }
    })
  }
}
