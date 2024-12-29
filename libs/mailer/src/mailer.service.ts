import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport } from 'nodemailer'

interface MailerSend {
  to: string
  html: string
  subject: string
}

@Injectable()
export class MailerService {  
  constructor(
    private configService: ConfigService
  ) {}

  async send(params: MailerSend) {
    const mail = {
      ...params,
      from: this.configService.getOrThrow('MAIL_FROM'),
    }

    return await new Promise((resolve, reject) => {
  
      const smtpTransport = createTransport({
        host: this.configService.getOrThrow('MAIL_SERVER_HOST'),
        port: this.configService.getOrThrow('MAIL_SERVER_PORT'),
        auth: {
          user: this.configService.getOrThrow('MAIL_USER'),
          pass: this.configService.getOrThrow('MAIL_PASSWORD'),
        }
      })
      
      smtpTransport.sendMail(mail, error => {
        if (error) {
          smtpTransport.close()
          reject(error)
        }
        smtpTransport.close()
        resolve(mail)
      })
    })
  }
}

