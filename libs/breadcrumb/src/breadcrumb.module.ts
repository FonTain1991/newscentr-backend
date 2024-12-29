import { PostModule } from '@app/post'
import { PostCategoryModule } from '@app/post-category'
import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { BreadcrumbService } from './breadcrumb.service'

@Module({
  imports: [PrismaModule, PostCategoryModule, PostModule],
  providers: [BreadcrumbService],
  exports: [BreadcrumbService],
})
export class BreadcrumbModule { }
