import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { FileManagerType } from '@prisma/client'
import { FolderCreate } from './file-manager.model'
import { FOLDER, IMAGE } from './file-manager.constants'

@Injectable()
export class FileManagerService {
  constructor(
    private prismaService: PrismaService
  ) { }

  async createFolder(params: FolderCreate) {
    let parent
    if (params?.parentId) {
      parent = await this.getById(params.parentId)
    }

    return await this.prismaService.fileManager.create({
      data: {
        name: params.name,
        type: FileManagerType.FOLDER,
        parentId: parent?.id,
        order: parent?.id ? parent.order + 1 : 0
      }
    })
  }

  async getById(id: string) {
    return await this.prismaService.fileManager.findFirst({
      where: { id }
    })
  }

  async getAllChild(parentId: string) {
    return await this.prismaService.$queryRaw`
      WITH RECURSIVE
        "R" AS (
        SELECT
          *
        FROM
          "FileManager" AS "t"
        WHERE
          "id" = ${parentId}
        UNION ALL
        SELECT
          "M".*
        FROM
          "FileManager" "M"
          JOIN "R" ON "M"."parentId" = "R"."id"
      )
      SELECT * FROM "R"`
  }

  async delete(id: string) {
    const file = await this.prismaService.fileManager.findFirst({ where: { id } })
    if (file.type === IMAGE) {
      await this.prismaService.images.delete({
        where: { id: file.value }
      })
      await this.prismaService.fileManager.delete({
        where: { id }
      })
      return null
    }

    if (file.type === FOLDER) {
      const childs: any = await this.getAllChild(id)
      const imagesId = childs.filter(v => v.type === IMAGE).map(v => v.value)
      const filesId = childs.map(v => v.id)

      await Promise.all([
        this.prismaService.fileManager.deleteMany({
          where: {
            id: {
              in: filesId
            }
          }
        }),
        this.prismaService.images.deleteMany({
          where: {
            id: {
              in: imagesId
            }
          }
        })
      ])
      return null
    }

    return null
  }

  async addImage({ id, name, parentId }: { id: string, name: string, parentId?: string }) {
    let parent
    if (parentId) {
      parent = await this.getById(parentId)
    }
    return await this.prismaService.fileManager.create({
      data: {
        parentId: parent?.id,
        order: parent?.id ? parent.order + 1 : 0,
        value: id,
        name: name,
        type: FileManagerType.IMAGE
      },
    })
  }

  async getByParentId(parentId?: string) {
    return await this.prismaService.fileManager.findMany({
      where:
        parentId ?
          { parentId } :
          { parentId: { equals: null } },
      orderBy: [
        { type: 'asc' },
        { name: 'asc' }
      ],
    })
  }

  async getAllParents(parentId: string) {
    return await this.prismaService.$queryRaw`
      WITH RECURSIVE "PARENT" AS
      (
          SELECT * FROM "FileManager" WHERE id IN (${parentId})
          UNION ALL 
          SELECT "FileManager".* FROM "FileManager" JOIN "PARENT" ON "FileManager"."id" = "PARENT"."parentId"
      )
      SELECT * FROM "PARENT" ORDER BY  "order" ASC`
  }
}
