
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Breadcrumb } from './breadcrumb.model'
import { BreadcrumbService } from './breadcrumb.service'

@Resolver(Breadcrumb)
export class BreadcrumbResolver {
  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

  @Query(() => Breadcrumb)
  async getBreadcrumb(@Args('params') params: string) {
    return await this.breadcrumbService.get(params)
  }
}