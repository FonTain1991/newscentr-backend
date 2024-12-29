import { RecipeModule } from '@app/recipe'
import { RecipeCategoryModule } from '@app/recipe-category'
import { forwardRef, Module } from '@nestjs/common'
import { SitemapXmlService } from './sitemap-xml.service'
import { SitemapXmlController } from './sitemap-xml.controller'
import { PostModule } from '@app/post'
import { PostCategoryModule } from '@app/post-category'

@Module({
  imports: [forwardRef(() => RecipeCategoryModule), forwardRef(() => RecipeModule), forwardRef(() => PostCategoryModule), forwardRef(() => PostModule)],
  controllers: [SitemapXmlController],
  providers: [SitemapXmlService],
  exports: [SitemapXmlService],
})
export class SitemapXmlModule { }
