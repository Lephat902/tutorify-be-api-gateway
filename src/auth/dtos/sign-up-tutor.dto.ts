import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';
import { SignUpDto } from './sign-up-base-user.dto';
import { Transform, Type } from 'class-transformer';

export class SignUpTutorDto extends SignUpDto {
  @ApiProperty({
    description: 'Biography of the tutor',
    example: 'I am a passionate educator with 10 years of experience...',
    required: false,
  })
  @IsString()
  public readonly biography: string;

  @ApiProperty({
    description: 'Minimum wage expected by the tutor',
    example: '3.000.000 VND',
    required: false,
  })
  @IsString()
  public readonly minimumWage: string;

  @ApiProperty({
    description: 'Current workplace of the tutor',
    example: 'ABC Academy',
    required: false,
  })
  @IsString()
  public readonly currentWorkplace: string;

  @ApiProperty({
    description: 'Current position of the tutor',
    example: 'Mathematics Teacher',
    required: false,
  })
  @IsString()
  public readonly currentPosition: string;

  @ApiProperty({
    description: 'Major of the tutor',
    example: 'Computer Science',
    required: false,
  })
  @IsString()
  public readonly major: string;

  @ApiProperty({
    description: 'Graduation year of the tutor',
    example: 2010,
    required: false,
    type: 'integer',
  })
  @IsInt()
  @Type(() => Number)
  public readonly graduationYear: number;

  @ApiProperty({
    description: "Class Categories' ids that tutor claim to be able to teach",
    type: 'array',
    items: { type: 'string' },
    example: [
      '3b5e5abb-f7ca-4503-bf8d-8e02dbc249e2',
      '83bdcea4-c6bf-4e7a-a9e0-d0894f5841bb',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  public readonly proficienciesIds: string[];

  // Any validation here has no effect for File type, this line just facilitates uploading file in swagger-ui
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  public readonly portfolios?: Array<Express.Multer.File>;

  @ApiProperty({
    description: 'Social Media Profiles of the tutor',
    type: 'array',
    items: { type: 'string' },
    example: [
      'https://www.facebook.com/tran.thanh.ne',
      'https://www.facebook.com/groups/elonmusk1',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  public readonly socialProfiles: string[];
}
