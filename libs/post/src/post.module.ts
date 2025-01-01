import { PrismaModule } from '@app/prisma'
import { forwardRef, Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostCategoryModule } from '@app/post-category'
import { SitemapXmlModule } from '@app/sitemap-xml'

@Module({
  imports: [PrismaModule, PostCategoryModule, forwardRef(() => SitemapXmlModule)],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule { }
