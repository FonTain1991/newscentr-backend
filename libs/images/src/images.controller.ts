import { Controller, Get, Header, HttpException, HttpStatus, Param, Post, Req, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { Readable } from 'stream'
import { ImagesService } from './images.service'

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return await this.imagesService.upload({ buffer: file.buffer, name: req.file.originalname, type: req.file.mimetype, parentId: req.body?.parentId })
    // const path = await fsPromises.writeFile('./' + req.file.originalname, file.buffer)
    // console.log(path)
    // return file.buffer.toString()
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response
  ) {

    // const file = await fsPromises.readFile('./' + id)
    const file = await this.imagesService.getById(id)
    if (!file) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND)
      // response.status(404).send('Image not found')
      // return
    }

    const stream = Readable.from(file.data)

    response.set({
      'Cache-Control': 'max-age=31536000',
      'Content-Disposition': `inline; filename="${file.name}"`,
      'Content-type': 'application/octet-stream'
    })

    return new StreamableFile(stream)
  }
}