import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsPhoneNumber, IsInt } from 'class-validator';
import { Gender, UserRole } from './auth.interfaces';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    required: true,
    type: 'string',
  })
  @IsEmail()
  public readonly email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  @MinLength(6)
  public readonly password: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    required: true,
    type: 'string',
  })
  @IsString()
  public readonly username: string;

  @ApiProperty({
    description: 'User gender',
    example: 'MALE',
    required: false,
    type: 'string',
    enum: Object.values(Gender),
  })
  @IsEnum(Gender)
  public readonly gender: Gender;

  @ApiProperty({
    description: 'User phone number',
    example: '1234567890',
    required: false,
    type: 'string',
  })
  // @IsPhoneNumber()
  public readonly phoneNumber: string;

  @ApiProperty({
    description: 'User address',
    example: '123 Main St',
    required: false,
    type: 'string',
  })
  @IsString()
  public readonly address: string;

  @ApiProperty({
    description: 'Ward ID',
    example: 1,
    required: false,
    type: 'integer',
  })
  @IsInt()
  public readonly wardId: number;
}

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    required: false,
    type: 'string',
  })
  @IsString()
  public readonly email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    required: false,
    type: 'string',
  })
  @IsString()
  public readonly username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    required: true,
    type: 'string',
  })
  @IsNotEmpty()
  public readonly password: string;
}

export class UserDto {
  id: string;
  email: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: Gender;
  phoneNumber: string;
  imgUrl: string;
  role: UserRole;
  address: string;
  wardId: number;
}