import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { SignUpDto } from './sign-up-base-user.dto';
import { Type } from 'class-transformer';
import { SocialProfile } from './social-profile.dto';
import { FileObject } from 'src/common/dtos';

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
  public readonly graduationYear: number;

  @IsOptional()
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
  public readonly proficienciesIds: string[];

  @IsOptional()
  @ApiProperty({
    description: 'List of File Object of portfolios',
    type: [FileObject],
    required: false,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => FileObject)
  public readonly tutorPortfolios?: FileObject[];

  @IsOptional()
  @ApiProperty({
    description: 'Social Media Profiles of the tutor',
    type: [SocialProfile],
    required: false,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => SocialProfile)
  public readonly socialProfiles: SocialProfile[];
}
