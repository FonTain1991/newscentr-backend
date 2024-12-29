import { Module } from '@nestjs/common'
import { RecipeIngredientService } from './recipe-ingredient.service'
import { PrismaModule } from '@app/prisma'

@Module({
  imports: [PrismaModule],
  providers: [RecipeIngredientService],
  exports: [RecipeIngredientService],
})
export class RecipeIngredientModule { }
