import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import * as fs from "fs/promises";
import * as path from "path";

@Injectable()
export class EmailSenderService {
  private transporter: nodemailer.Transporter;

  constructor() {
    if (!process.env.EMAIL_ADRESS || !process.env.EMAIL_PASSWORD) {
      throw new Error("Email or password are empty");
    }

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      host: "smtp.gmail.com",
      port: "465",
      auth: {
        user: process.env.EMAIL_ADRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string) {
    try {
      const templatePath = path.resolve(
        __dirname,
        "../templates/email-template.hbs",
      );

      const templateSource = await fs.readFile(templatePath, "utf-8");
      const template = handlebars.compile(templateSource);
      const htmlToSend = template({ to });

      const mailOptions = {
        from: process.env.EMAIL_ADRESS,
        to: to,
        subject: "Invitation",
        html: htmlToSend,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Cannot send an email");
    }
  }
}
