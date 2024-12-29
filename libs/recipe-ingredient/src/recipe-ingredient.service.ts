import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RecipeIngredientService {
  constructor(private prismaService: PrismaService) { }

  async getByRecipeId(recipeId: string) {
    return await this.prismaService.recipeIngredient.findMany({
      where: {
        recipeId
      },
      include: {
        ingredient: true
      }
    })
  }
}
