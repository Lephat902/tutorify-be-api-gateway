import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'test@test.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly email: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
    required: false,
  })
  @IsOptional()
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
