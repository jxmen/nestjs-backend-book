import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export default class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAILER_NAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });
  }

  async sendMemberJoinVerification(email: string, signupVerifyToken: string) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: email,
      subject: '가입 인증 메일',
      html: `
        가입 확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
        <form action=${url} method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
