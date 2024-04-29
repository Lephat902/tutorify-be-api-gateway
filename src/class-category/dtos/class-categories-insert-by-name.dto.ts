import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassCategoriesInsertByNameDto {
  @ApiProperty({
    description: 'Subject Name',
    example: 'Math',
    required: true,
  })
  @IsNotEmpty()
  public readonly name: string;
}
