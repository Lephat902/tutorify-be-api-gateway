import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { SignUpDto } from './sign-up-base-user.dto';
import { Transform, Type } from 'class-transformer';

export class SignUpTutorDto extends SignUpDto {
  @ApiProperty({
    description: 'Biography of the tutor',
    example: 'I am a passionate educator with 10 years of experience...',
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly biography: string;

  @ApiProperty({
    description: 'Minimum wage expected by the tutor',
    example: '3000000',
    required: false,
  })
  @IsOptional()
  public readonly minimumWage: string;

  @ApiProperty({
    description: 'Current workplace of the tutor',
    example: 'ABC Academy',
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly currentWorkplace: string;

  @ApiProperty({
    description: 'Current position of the tutor',
    example: 'Mathematics Teacher',
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly currentPosition: string;

  @ApiProperty({
    description: 'Major of the tutor',
    example: 'Computer Science',
    required: false,
  })
  @IsString()
  @IsOptional()
  public readonly major: string;

  @ApiProperty({
    description: 'Graduation year of the tutor',
    example: 2010,
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly graduationYear: number;

  @ApiProperty({
    description: "Class Categories' ids that tutor claim to be able to teach",
    type: 'array',
    items: { type: 'string' },
    required: false,
    example: [
      '3b5e5abb-f7ca-4503-bf8d-8e02dbc249e2',
      '83bdcea4-c6bf-4e7a-a9e0-d0894f5841bb',
    ],
  })
  @Transform(({ value }) => value.split(','))
  public readonly proficienciesIds: string[];

  // Any validation here has no effect for File type, this line just facilitates uploading file in swagger-ui
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  public readonly portfolios?: Array<Express.Multer.File>;

  @ApiProperty({
    description: 'Social Media Profiles of the tutor',
    type: 'array',
    items: { type: 'string' },
    required: false,
    example: [
      'https://www.facebook.com/tran.thanh.ne',
      'https://www.facebook.com/groups/elonmusk1',
    ],
  })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  public readonly socialProfiles: string[];
}
