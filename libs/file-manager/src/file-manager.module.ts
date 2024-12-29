import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { FileManagerService } from './file-manager.service'

@Module({
  imports: [PrismaModule],
  providers: [FileManagerService],
  exports: [FileManagerService],
})
export class FileManagerModule { }
