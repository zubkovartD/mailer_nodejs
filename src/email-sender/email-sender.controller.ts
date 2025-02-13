import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { EmailSenderDto } from "./dto/email-sender.dto";
import { EmailSenderService } from "./email-sender.service";

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@ApiTags("email-send")
@Controller("email-send")
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post()
  @ApiOperation({ summary: "Send email" })
  @ApiResponse({ status: 200, description: "Email sent successfully" })
  @ApiResponse({ status: 400, description: "Request body cannot be empty" })
  async sendEmail(@Body() data: EmailSenderDto) {
    const dataBody = Object.keys(data);
    if (dataBody.length === 0) {
      throw new BadRequestException("Request body cannot be empty");
    }

    const dataEmail = data.email;
    if (!dataEmail.match(emailRegExp)) {
      throw new BadRequestException("Not valid format of email adress");
    }

    await this.emailSenderService.sendEmail(dataEmail);

    return { message: "Email sent successfully" };
  }
}
