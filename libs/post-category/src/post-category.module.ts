import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { PostCategoryService } from './post-category.service'

@Module({
  imports: [PrismaModule],
  providers: [PostCategoryService],
  exports: [PostCategoryService],
})
export class PostCategoryModule { }
