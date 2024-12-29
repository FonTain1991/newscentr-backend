import { Module } from '@nestjs/common'
import { BreadcrumbService } from './breadcrumb.service'
import { PrismaModule } from '@app/prisma'
import { RecipeCategoryModule } from '@app/recipe-category'
import { PostCategoryModule } from '@app/post-category'
import { RecipeModule } from '@app/recipe'
import { PostModule } from '@app/post'

@Module({
  imports: [PrismaModule, RecipeCategoryModule, PostCategoryModule, RecipeModule, PostModule],
  providers: [BreadcrumbService],
  exports: [BreadcrumbService],
})
export class BreadcrumbModule { }
