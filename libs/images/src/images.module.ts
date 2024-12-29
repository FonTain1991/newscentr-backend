import { Module } from '@nestjs/common'
import { ImagesService } from './images.service'
import { PrismaModule } from '@app/prisma'
import { FileManagerModule } from '@app/file-manager'

@Module({
  imports: [PrismaModule, FileManagerModule],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule { }
