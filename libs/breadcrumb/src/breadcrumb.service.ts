import { PostService } from '@app/post'
import { PostCategoryService } from '@app/post-category'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BreadcrumbService {
  constructor(
    private postCategoryService: PostCategoryService,
    private postService: PostService,
  ) { }

  async get(params: string) {
    const [categoryUrl, postUrl] = JSON.parse(params)

    let post
    if (postUrl) {
      post = await this.postService.getByUrl({ url: postUrl, postCategoryUrl: categoryUrl })
    }

    const category = await this.postCategoryService.getByUrl(categoryUrl)
    return {
      category,
      post
    }
  }
}
