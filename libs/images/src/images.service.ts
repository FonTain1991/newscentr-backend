import { FileManagerService } from '@app/file-manager'
import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { JsArgs } from '@prisma/client/runtime/library'

@Injectable()
export class ImagesService {
  constructor(
    private prismaService: PrismaService,
    private fileManagerService: FileManagerService,
  ) { }

  async upload({ buffer, name, type, parentId }: { buffer: Buffer, name: string, type: string, parentId?: string }) {
    const image = await this.prismaService.images.create({
      data: {
        data: buffer,
        type,
        name
      },
      select: {
        createdAt: true,
        id: true,
        name: true,
        type: true
      }
    })

    await this.fileManagerService.addImage({ id: image.id, name: image.name, parentId })
    return image
  }

  async getById(id: string, options?: JsArgs) {
    return await this.prismaService.images.findFirst({
      where: { id },
      ...options
    })
  }

  async delete(id: string) {
    return await this.prismaService.images.delete({
      where: { id }
    })
  }
}
