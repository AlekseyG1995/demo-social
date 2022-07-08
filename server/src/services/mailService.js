import nodemailer from 'nodemailer'
import { logger } from '../utils/logger.js'

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, link) {
    try {
      // logger.info('[mailService] send imitation!')
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Activation account from ${process.env.API_URL}`,
        text: '',
        html: `
                <div>
                  <h1>Follow this link from registration</h1>
                  <a href="${link}">${link}</a>
                </div>
              `,
      })
      logger.debug('[mailService] Mail has been send!')
    } catch (e) {
      logger.error('[mailService] Error sanding mail!', e)
    }
  }
}

export const mailService = new MailService()
