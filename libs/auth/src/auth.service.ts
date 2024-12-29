import { GQLContext } from '@app/graphql/graphql.types'
import { MailerService } from '@app/mailer'
import { PrismaService } from '@app/prisma'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v4 as uuidv4 } from 'uuid'
import { AUTH } from './auth.const'

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
    private prismaService: PrismaService
  ) { }

  async recoveryPassword(email: string) {
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        email
      }
    })

    const token = await this.setRecoveryToken(user.id)
    await this.mailerService.send({
      to: email,
      subject: 'Восстановление аккаунта',
      html: `
      <div>
        <div style="font-size: 14px;">
            Приветствуем!
        </div>
        <p style="font-size: 14px;margin-top: 25px;">
            Для сброса пароля перейдите по ссылке:
        </p>
        <a href = "${this.configService.getOrThrow('WEB_URI')}/auth/recovery/new-password/${token.recoveryToken}" style = "font-weight: bold; line-height: 40px;text-decoration: none; text-align: center; font-size: 14px;background-color: #EB6D7F;border-radius: 5px;width: 150px;height: 40px;color: #fff;margin: 30px auto;display: block;">Сброс пароля</a>
      </div>	
      `
    })
  }

  async setRecoveryToken(userId: string) {
    const recoveryToken = uuidv4()
    return await this.prismaService.authRecovery.upsert({
      where: { userId },
      update: {
        recoveryToken,
        recoveryTokenExpires: new Date(Date.now() + AUTH.RECOVERY_TOKEN_EXPIRES)
      },
      create: {
        userId,
        recoveryToken
      }
    })
  }

  async checkRecoveryToken(token: string) {
    const auth = await this.prismaService.authRecovery.findFirst({
      where: {
        recoveryToken: token,
        recoveryTokenExpires: {
          lt: new Date()
        }
      }
    })

    if (!auth) {
      throw new Error(AUTH.TOKEN_INVALID)
    }
  }

  async signOut(ctx: GQLContext) {
    await this.prismaService.userSession.delete({
      where: {
        token: ctx.req.cookies.token
      }
    })

    ctx.res.clearCookie('token')
    return ctx.user
  }

  async signIn(login: string, password: string, ctx: GQLContext) {
    if (ctx.user) {
      return ctx.user
    }

    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        login,
        password
      }
    })

    await this.setSession(user.id, ctx)

    return user
  }

  async setSession(userId: string, ctx: GQLContext) {
    const expires = new Date(Date.now() + 9999999999)
    const userSession = await this.prismaService.userSession.create({
      data: {
        userId,
        expires: expires
      }
    })

    ctx.res.cookie('token', userSession.token, {
      expires: expires,
      httpOnly: true
    })
  }

  async findUserByToken(token: string) {
    const userSession = token ? await this.prismaService.userSession.findUnique({
      where: { token },
      include: {
        User: true
      }
    }) : undefined
    return userSession?.User
  }

  async setNewPassword(token: string, password: string, password2: string) {
    if (password !== password2) {
      throw new Error(AUTH.PASSWORD_MISMATCH)
    }

    await this.checkRecoveryToken(token)
    const user = await this.prismaService.user.findFirstOrThrow({
      where: {
        AuthRecovery: {
          recoveryToken: token
        }
      }
    })

    if (user.password === password) {
      throw new Error(AUTH.PASSWORD_BE_DIFFERENT)
    }

    await Promise.all([
      this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          password
        }
      }),
      this.prismaService.authRecovery.delete({
        where: {
          userId: user.id,
        }
      })
    ])
  }

  async register(params, ctx: GQLContext) {
    const { email, password, confirmPassword } = params
    if (password !== confirmPassword) {
      throw new Error(AUTH.PASSWORD_MISMATCH)
    }

    const user = await this.prismaService.user.create({
      data: {
        email,
        password,
        login: email
      }
    })
    await this.setSession(user.id, ctx)

    return user
  }
}
