import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmailSenderController } from "./email-sender/email-sender.controller";
import { EmailSenderService } from "./email-sender/email-sender.service";

@Module({
  imports: [],
  controllers: [AppController, EmailSenderController],
  providers: [AppService, EmailSenderService],
})
export class AppModule {}
