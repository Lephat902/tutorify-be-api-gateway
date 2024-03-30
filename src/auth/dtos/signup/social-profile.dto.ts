import { ApiProperty } from '@nestjs/swagger';

export class SocialProfile {
  @ApiProperty({
    description: 'profile\'s name',
    example: 'facebook',
    required: true,
  })
  public readonly name: string;

  @ApiProperty({
    description: 'profile\'s url',
    example: 'https://www.facebook.com/groups/elonmusk1',
    required: true,
  })
  public readonly url: string;

  constructor (name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
