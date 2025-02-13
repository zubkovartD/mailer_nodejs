import { ApiProperty } from '@nestjs/swagger';

export class EmailSenderDto {
  @ApiProperty({ example: 'test123@somemail.com', description: 'User email' })
  email: string;
}
