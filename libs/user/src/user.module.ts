import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaModule } from '@app/prisma'

@Module({
  imports: [PrismaModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule { }
