import { PrismaModule } from '@app/prisma'
import { SitemapXmlModule } from '@app/sitemap-xml'
import { forwardRef, Module } from '@nestjs/common'
import { RecipeCategoryService } from './recipe-category.service'

@Module({
  imports: [PrismaModule, forwardRef(() => SitemapXmlModule)],
  providers: [RecipeCategoryService],
  exports: [RecipeCategoryService],
})
export class RecipeCategoryModule { }
