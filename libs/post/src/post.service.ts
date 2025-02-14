import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { PostCreate, PostUpdate } from './post.model'
import { PostCategoryService } from '@app/post-category'
import { Post, Prisma } from '@prisma/client'
import { SitemapXmlService } from '@app/sitemap-xml'

@Injectable()
export class PostService {
  constructor(
    private prismaService: PrismaService,
    private postCategoryService: PostCategoryService,
    private sitemapXmlService: SitemapXmlService
  ) { }

  async create(params: PostCreate) {
    const post = await this.prismaService.post.create({
      data: {
        pageName: params.pageName,
        pageTitle: params.pageTitle,
        url: params.url,
        text: params.text,
        isPublish: params.isPublish,
        createdAt: new Date(),
        postCategoryId: params.postCategoryId,
        keywords: params.keywords,
        description: params.description,
        previewId: params.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle
      }
    })
    await this.sitemapXmlService.generate()
    return post
  }

  async getById(id: string) {
    return await this.prismaService.post.findFirstOrThrow({
      where: { id }
    })
  }

  async getAll(params?: Prisma.PostFindManyArgs): Promise<Post[]> {
    return await this.prismaService.post.findMany({
      ...params,
      orderBy: params?.orderBy ?? [{
        createdAt: 'desc'
      }]
    })
  }

  async update(params: PostUpdate) {
    const post = await this.prismaService.post.update({
      where: { id: params.id },
      data: {
        pageName: params.pageName,
        pageTitle: params.pageTitle,
        url: params.url,
        text: params.text,
        isPublish: params.isPublish,
        postCategoryId: params.postCategoryId,
        keywords: params?.keywords,
        description: params.description,
        previewId: params.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle
      }
    })
    await this.sitemapXmlService.generate()
    return post
  }

  async getByUrl({ url, postCategoryUrl }: { url: string, postCategoryUrl: string }): Promise<Post> {
    const category = await this.postCategoryService.getByUrl(postCategoryUrl)
    return await this.prismaService.post.findFirst({
      where: { url, postCategoryId: category.id, isPublish: true },
    })
  }

  async updateCountSee(url: string): Promise<Post[]> {
    return await this.prismaService.$queryRaw<Post[]>`UPDATE "Post" SET "countSee"="countSee"+1 WHERE url=${url}`
  }

  async countAll() {
    return {
      total: await this.prismaService.post.count()
    }
  }

  async getAllForXml() {
    return await this.prismaService.post.findMany({
      where: {
        isPublish: true,
      },
      select: {
        url: true,
        createdAt: true,
        postCategory: {
          select: {
            url: true
          }
        }
      },
    })
  }

  async getPostsByPostCategoryUrl(url: string): Promise<Post[]> {
    const postCategories = await this.postCategoryService.getWithParents(url)
    return await this.prismaService.post.findMany({
      where: {
        isPublish: true,
        postCategoryId: {
          in: postCategories.map(v => v.id)
        }
      },
      orderBy: [{
        createdAt: 'desc'
      }]
    })
  }
}
