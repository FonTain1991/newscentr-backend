import { INestApplication, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { ITXClientDenyList, Types } from '@prisma/client/runtime/library'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

type PrismaTransactionOptions = {
  retry?: number
  isolationLevel?: Prisma.TransactionIsolationLevel
}

function createPrismaClient() {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      }
    ],
  })

  prisma.$on('query', (e) => {
    if (e.duration > 100) {
      console.warn('Query: ' + e.query)
      console.warn('Params: ' + e.params)
      console.warn('Duration: ' + e.duration + 'ms')
    }
  })

  async function $transactionRetry<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: PrismaTransactionOptions
  ): Promise<Types.Utils.UnwrapTuple<P>>
  async function $transactionRetry<R>(
    fn: (prisma: Omit<PrismaClient, ITXClientDenyList>) => Promise<R>,
    options?: PrismaTransactionOptions & { maxWait?: number; timeout?: number; }
  ): Promise<R>
  async function $transactionRetry<P extends Prisma.PrismaPromise<any>[], R>(
    argOrFn: [...P] | ((prisma: Omit<PrismaClient, ITXClientDenyList>) => Promise<R>),
    options?: PrismaTransactionOptions & { maxWait?: number; timeout?: number; }
  ): Promise<Types.Utils.UnwrapTuple<P> | R> {

    const max_retries = options?.retry || 1
    let retries = 0
    while (retries < max_retries) {
      try {
        if (typeof argOrFn === 'function') {
          return await Prisma.getExtensionContext(this).$transaction(argOrFn, options)
        }

        if (argOrFn instanceof Array) {
          return await Prisma.getExtensionContext(this).$transaction(argOrFn, options)
        }

        return
      } catch (error) {
        if (error.code === 'P2034') {
          retries++
          if (retries < max_retries) {
            await sleep(retries * 100)
            continue
          } else {
            throw error
          }
        }
        throw error
      }
    }
  }

  async function enableShutdownHooks(app: INestApplication) {
    Prisma.getExtensionContext(this).$on('beforeExit', async () => {
      await app.close()
    })
  }

  return prisma.$extends({
    client: {
      $transactionRetry,
      enableShutdownHooks
    }
  })
}

const ExtendedPrismaClient = class {
  constructor() {
    return createPrismaClient()
  }
} as new () => ReturnType<typeof createPrismaClient>

@Injectable()
export class PrismaService extends ExtendedPrismaClient {
  constructor() {
    super()
  }
}