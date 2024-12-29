
import { User } from '@prisma/client'

export enum GQLDirectives {
  isAuth = '@isAuth',
  isAdmin = '@isAdmin'
}

export interface GQLContext {
  req: any
  res: any
  user?: User
}