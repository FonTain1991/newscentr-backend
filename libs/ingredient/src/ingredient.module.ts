import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { IngredientService } from './ingredient.service'

@Module({
  imports: [PrismaModule],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientModule { }
