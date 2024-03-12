import { ApiProperty } from '@nestjs/swagger';
import { 
  IsOptional, 
  IsString, 
  MinLength,
  Matches,
  Length,
} from 'class-validator';

// This class is used to make 'required' attributes of create to be 'optional'
export class OverwriteCreate {
  @ApiProperty({
    description: 'New user password',
    example: 'password',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  public readonly password: string;

  @ApiProperty({
    description: "User's old password, required to change to new password",
    example: 'old password',
    required: false,
  })
  @IsOptional()
  @IsString()
  public readonly oldPassword: string;

  @ApiProperty({
    description: 'Username',
    example: 'john_doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(5, 20, {
    message: 'Username must be between 5 and 20 characters long',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  public readonly username: string;
}
