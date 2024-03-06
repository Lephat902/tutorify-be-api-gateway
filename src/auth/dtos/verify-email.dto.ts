import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Verification token',
    example: 'hfhfh123@@@65656',
    required: true,
  })
  @IsNotEmpty()
  token: string;
}
