import { PostModule } from '@app/post'
import { PostCategoryModule } from '@app/post-category'
import { forwardRef, Module } from '@nestjs/common'
import { SitemapXmlController } from './sitemap-xml.controller'
import { SitemapXmlService } from './sitemap-xml.service'

@Module({
  imports: [forwardRef(() => PostCategoryModule), forwardRef(() => PostModule)],
  controllers: [SitemapXmlController],
  providers: [SitemapXmlService],
  exports: [SitemapXmlService],
})
export class SitemapXmlModule { }
