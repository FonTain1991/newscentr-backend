import { PrismaModule } from '@app/prisma'
import { RecipeCategoryModule } from '@app/recipe-category'
import { RecipeIngredientModule } from '@app/recipe-ingredient'
import { SitemapXmlModule } from '@app/sitemap-xml'
import { forwardRef, Module } from '@nestjs/common'
import { RecipeService } from './recipe.service'

@Module({
  imports: [PrismaModule, RecipeIngredientModule, RecipeCategoryModule, forwardRef(() => SitemapXmlModule)],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule { }
