import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class SocialProfile {
  @ApiProperty({
    description: 'profile\'s name',
    example: 'facebook',
    required: true,
  })
  @IsOptional()
  @IsString()
  public readonly name: string;

  @ApiProperty({
    description: 'profile\'s url',
    example: 'https://www.facebook.com/groups/elonmusk1',
    required: true,
  })
  @IsUrl()
  public readonly url: string;
}
