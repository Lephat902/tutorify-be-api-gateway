import { ApiProperty } from '@nestjs/swagger';
import { SignUpDto } from './sign-up-base-user.dto';
import { IsString, IsOptional, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @IsOptional()
  @ApiProperty({
    description: "Class Categories' ids that student is interested in",
    type: 'array',
    items: { type: 'string' },
    required: false,
    example: [
      '3b5e5abb-f7ca-4503-bf8d-8e02dbc249e2',
      '83bdcea4-c6bf-4e7a-a9e0-d0894f5841bb',
    ],
  })
  @Transform(({ value }) => value.split(','))
  public readonly interestedClassCategoryIds: string[];
}
