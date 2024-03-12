import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from './sign-up-base-user.dto';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class SignUpStudentDto extends SignUpDto {
  @ApiProperty({
    description: "Provide parent's email in order for system to contact when needed",
    example: 'test@test.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  public readonly parentEmail: string;

  @ApiProperty({
    description: 'Parent first name',
    example: 'Jane',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly parentFirstName: string;

  @ApiProperty({
    description: 'Parent middle name',
    example: 'Anne',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly parentMiddleName: string;

  @ApiProperty({
    description: 'Parent last name',
    example: 'Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly parentLastName: string;
}
