import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from './sign-up-base-user.dto';
import { IsString, IsOptional } from 'class-validator';

export class SignUpStudentDto extends SignUpDto {
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
