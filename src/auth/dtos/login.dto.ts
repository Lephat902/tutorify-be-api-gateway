import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    required: false,
  })
  @IsString()
  public readonly email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    required: false,
  })
  @IsString()
  public readonly username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  public readonly password: string;
}
