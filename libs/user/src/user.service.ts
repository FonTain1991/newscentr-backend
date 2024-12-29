import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { UserUpdate } from './user.model'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async getById(id: string) {
    return await this.prismaService.user.findFirstOrThrow({
      where: { id }
    })
  }

  async update(params: UserUpdate): Promise<User> {
    return await this.prismaService.user.update({
      where: { id: params.id },
      data: {
        firstName: params?.firstName,
        lastName: params?.lastName,
        avatar: params?.avatar
      }
    })
  }
}