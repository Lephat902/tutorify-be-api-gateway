import { ApiProperty } from '@nestjs/swagger'

export class FileMetadataDto {
  @ApiProperty({
    description: 'Container name',
    example: 'avatar',
    required: true,
    type: 'string',
  })
  public readonly container: string

  @ApiProperty({
    description: 'File name',
    example: 'user-3',
    required: true,
    type: 'string',
  })
  public readonly name: string
}
