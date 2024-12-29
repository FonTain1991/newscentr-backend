import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostCategoryModule } from '@app/post-category'

@Module({
  imports: [PrismaModule, PostCategoryModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule { }
