import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Gender } from '@tutorify/shared';

export class SignUpDto {
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
  @MinLength(6)
  public readonly password: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    required: true,
  })
  @IsString()
  public readonly username: string;

  @ApiProperty({
    description: 'User gender',
    example: 'MALE',
    required: false,
    enum: Object.values(Gender),
  })
  @IsEnum(Gender)
  public readonly gender: Gender;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    required: false,
  })
  // @IsPhoneNumber()
  @IsString()
  public readonly phoneNumber: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
    required: false,
  })
  @IsString()
  public readonly address: string;

  @ApiProperty({
    description: 'Ward ID',
    example: '1',
    required: false,
  })
  @IsString()
  public readonly wardId: string;

  @ApiProperty({
    description: 'Student first name',
    example: 'John',
    required: false,
  })
  @IsString()
  public readonly firstName: string;

  @ApiProperty({
    description: 'Student middle name',
    example: 'William',
    required: false,
  })
  @IsString()
  public readonly middleName: string;

  @ApiProperty({
    description: 'Student last name',
    example: 'Doe',
    required: false,
  })
  @IsString()
  public readonly lastName: string;

  // Any validation here has no effect for File type, this line just facilitates uploading file in swagger-ui
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  public readonly avatar?: Express.Multer.File;
}
