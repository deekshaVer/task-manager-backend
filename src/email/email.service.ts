import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendResetPasswordEmail(to: string, resetLink: string) {
    await this.resend.emails.send({
      from: 'onboarding@resend.dev', // use default for now
      to,
      subject: 'Reset your password',
      html: `
        <div style="font-family:sans-serif">
          <h2>Reset Password</h2>
          <p>Click below to reset your password:</p>
          <a href="${resetLink}" style="
            display:inline-block;
            padding:10px 15px;
            background:#6366f1;
            color:white;
            border-radius:6px;
            text-decoration:none;
          ">
            Reset Password
          </a>
          <p>This link expires in 15 minutes.</p>
        </div>
      `,
    });
  }
}
