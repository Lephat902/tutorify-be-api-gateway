import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  ValidateIf,
  Matches, 
  Length,
  ValidateNested,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';
import { Gender, UserRole } from '@tutorify/shared';
import { FileObject } from 'src/common/dtos';
import { Type } from 'class-transformer';

export class SignUpDto {
  @ApiHideProperty()
  public role: UserRole;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    required: true,
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  public readonly password: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    required: true,
  })
  @IsString()
  @Length(5, 20, {
    message: 'Username must be between 5 and 20 characters long',
  })
  @Matches(/^\w+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  public readonly username: string;

  @ApiProperty({
    description: 'User gender',
    example: 'MALE',
    required: false,
    enum: Object.values(Gender),
  })
  @ValidateIf((_object, value) => value)
  @IsEnum(Gender)
  public readonly gender: Gender;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly phoneNumber: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly address: string;

  @ApiProperty({
    description: 'Ward ID',
    example: '00001',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly wardId: string;

  @ApiProperty({
    description: 'Student first name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly firstName: string;

  @ApiProperty({
    description: 'Student middle name',
    example: 'William',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly middleName: string;

  @ApiProperty({
    description: 'Student last name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly lastName: string;

  @IsOptional()
  @ApiProperty({
    description: 'Avatar of the user',
    type: FileObject,
    required: false,
  })
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => FileObject)
  public readonly avatar: FileObject;
}
