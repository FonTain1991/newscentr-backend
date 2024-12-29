import { MailerModule } from '@app/mailer'
import { PrismaModule } from '@app/prisma'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthService } from './auth.service'

@Module({
  imports: [PrismaModule, MailerModule, ConfigModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
