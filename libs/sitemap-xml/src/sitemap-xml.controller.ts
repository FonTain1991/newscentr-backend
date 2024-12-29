import { Controller, Get, Res, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import { readFile } from 'fs/promises'
import * as path from 'path'
import { Readable } from 'stream'


@Controller('sitemap')
export class SitemapXmlController {
  @Get()
  async sitemap(
    @Res({ passthrough: true }) response: Response
  ) {
    try {

      const _path = path.resolve(__dirname, '../../../public/sitemap.xml')
      const file = await readFile(_path, { encoding: 'utf8' })
      const stream = Readable.from(file)
      response.set({
        'Content-Type': 'text/xml'
      })
      return new StreamableFile(stream)
    } catch (error) {
      response.status(505)
    }
  }
}