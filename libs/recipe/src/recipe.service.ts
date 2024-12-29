import { PrismaService } from '@app/prisma'
import { RecipeCategoryService } from '@app/recipe-category'
import { SitemapXmlService } from '@app/sitemap-xml'
import { Injectable } from '@nestjs/common'
import { Prisma, Recipe } from '@prisma/client'
import { RecipeCreate, RecipeUpdate } from './recipe.model'

@Injectable()
export class RecipeService {
  constructor(
    private prismaService: PrismaService,
    private recipeCategoryService: RecipeCategoryService,
    private sitemapXmlService: SitemapXmlService,
  ) { }

  async create(params: RecipeCreate): Promise<Recipe> {
    const recipe = await this.prismaService.recipe.create({
      data: {
        pageName: params.pageName,
        pageTitle: params.pageTitle,
        url: params.url,
        text: params.text,
        isPublish: params.isPublish,
        createdAt: new Date(),
        recipeCategoryId: params.recipeCategoryId,
        keywords: params.keywords,
        description: params.description,
        previewId: params.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle,
        activeCookingTime: params?.activeCookingTime,
        totalCookingTime: params?.totalCookingTime,
        RecipeIngredient: {
          createMany: params.ingredients ? {
            data: JSON.parse(params.ingredients)
          } : undefined,
        },
      }
    })
    await this.sitemapXmlService.generate()
    return recipe
  }

  async getById(id: string): Promise<Recipe> {
    return await this.prismaService.recipe.findFirst({
      where: { id }
    })
  }

  async getAll(params?: Prisma.RecipeFindManyArgs): Promise<Recipe[]> {
    return await this.prismaService.recipe.findMany({
      ...params,
      orderBy: params?.orderBy ?? [{
        createdAt: 'desc'
      }]
    })
  }

  async countAll() {
    return {
      total: await this.prismaService.recipe.count()
    }
  }

  async getAllForXml() {
    return await this.prismaService.recipe.findMany({
      select: {
        url: true,
        createdAt: true,
        recipeCategory: {
          select: {
            url: true
          }
        }
      },
    })
  }

  async update(params: RecipeUpdate): Promise<Recipe> {
    const recipe = await this.prismaService.recipe.update({
      where: { id: params.id },
      data: {
        pageName: params.pageName,
        pageTitle: params.pageTitle,
        url: params.url,
        text: params.text,
        isPublish: params.isPublish,
        recipeCategoryId: params.recipeCategoryId,
        keywords: params?.keywords,
        description: params.description,
        previewId: params.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle,
        activeCookingTime: params?.activeCookingTime,
        totalCookingTime: params?.totalCookingTime,
        RecipeIngredient: {
          deleteMany: {},
          createMany: params?.ingredients ? {
            data: JSON.parse(params.ingredients)
          } : undefined,
        },
      }
    })
    await this.sitemapXmlService.generate()
    return recipe
  }

  async getByUrl({ url, recipeCategoryUrl }: { url: string, recipeCategoryUrl: string }): Promise<Recipe> {
    const category = await this.recipeCategoryService.getByUrl(recipeCategoryUrl)
    if (!category) {
      return null
    }
    return await this.prismaService.recipe.findFirst({
      where: { url, recipeCategoryId: category.id },
    })
  }

  async getRecipesByRecipeCategoryUrl(url: string): Promise<Recipe[]> {
    const recipeCategories = await this.recipeCategoryService.getWithParents(url)
    return await this.prismaService.recipe.findMany({
      where: {
        recipeCategoryId: {
          in: recipeCategories.map(v => v.id)
        }
      },
      orderBy: [{
        createdAt: 'desc'
      }]
    })
  }

  async updateCountSee(url: string): Promise<Recipe[]> {
    return await this.prismaService.$queryRaw<Recipe[]>`UPDATE "Recipe" SET "countSee"="countSee"+1 WHERE url=${url}`
  }
}
