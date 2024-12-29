import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { IngredientCreate, IngredientUpdate } from './ingredient.model'

@Injectable()
export class IngredientService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async create(params: IngredientCreate) {
    return await this.prismaService.ingredient.create({
      data: {
        title: params.title,
        description: params?.description,
        previewId: params?.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle,
        iconId: params?.iconId,
        parentId: params?.parentId
      }
    })
  }

  async getById(id: string) {
    return await this.prismaService.ingredient.findFirstOrThrow({
      where: { id }
    })
  }

  async getAll() {
    return await this.prismaService.ingredient.findMany()
  }

  async update(params: IngredientUpdate) {
    return await this.prismaService.ingredient.update({
      where: { id: params.id },
      data: {
        title: params.title,
        description: params?.description,
        previewId: params?.previewId,
        previewAlt: params?.previewAlt,
        previewTitle: params?.previewTitle,
        iconId: params?.iconId,
        parentId: params?.parentId
      }
    })
  }
}
