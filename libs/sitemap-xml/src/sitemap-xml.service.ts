import { PostService } from '@app/post'
import { PostCategoryService } from '@app/post-category'
import { forwardRef, Inject, Injectable } from '@nestjs/common'
import * as dayjs from 'dayjs'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'
import { mkDir } from 'utils'

@Injectable()
export class SitemapXmlService {
  constructor(
    @Inject(forwardRef(() => PostService)) private postService: PostService,
    @Inject(forwardRef(() => PostCategoryService)) private postCategoryService: PostCategoryService,
  ) { }

  async generate() {
    const [
      posts,
      postCategories
    ] = await Promise.all([
      this.postService.getAllForXml(),
      this.postCategoryService.getAllForXml()
    ])

    const data = [{
      loc: process.env.WEB_URI,
      lastmod: '2024-10-28',
      changefreq: 'weekly',
      priority: 1
    }]

    for (const pc of postCategories) {
      data.push({
        loc: `${process.env.WEB_URI}/${pc.url}`,
        lastmod: dayjs(pc.createdAt).format('YYYY-MM-DD'),
        changefreq: 'weekly',
        priority: 0.8
      })
    }

    for (const post of posts) {
      data.push({
        loc: `${process.env.WEB_URI}/${post.postCategory.url}/${post.url}`,
        lastmod: dayjs(post.createdAt).format('YYYY-MM-DD'),
        changefreq: 'weekly',
        priority: 1
      })
    }

    const _xml = []
    _xml.push('<?xml version=\'1.0\' encoding=\'UTF-8\'?>')
    _xml.push('<urlset xmlns=\'https://www.sitemaps.org/schemas/sitemap/0.9\'>')
    const xml = data.reduce((prev, cur) => {
      prev.push(`\n\t<url>
      \t<loc>${cur.loc}</loc>
      \t<lastmod>${cur.lastmod}</lastmod>
      \t<changefreq>${cur.changefreq}</changefreq>
      \t<priority>${cur.priority}</priority>
      </url>`)
      return prev
    }, _xml)

    xml.push('\n</urlset>')

    const _path = resolve(mkDir('../../../public'), 'sitemap.xml')
    await writeFile(_path, xml.reduce((prev, curr) => {
      prev += curr
      return prev
    }, ''))
  }
}
