import { GraphqlModule } from '@app/graphql'
import { NestFactory } from '@nestjs/core'
import { json } from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'


async function bootstrap() {
  const app = await NestFactory.create(GraphqlModule)
  app.enableShutdownHooks()
  app.use(cookieParser())
  app.use(json({ limit: '10mb' }))
  app.getHttpAdapter().getInstance().disable('x-powered-by')
  app.setGlobalPrefix('api')
  app.use(compression())
  await app.listen(4444)

  console.log('Server listen port:', 4444)
}

bootstrap()
