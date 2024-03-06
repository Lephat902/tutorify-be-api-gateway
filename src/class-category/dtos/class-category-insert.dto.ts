import { IsNotEmpty } from 'class-validator';
import { LevelDto, SubjectDto } from '.';
import { ApiProperty } from '@nestjs/swagger';

export class ClassCategoryInsertDto {
  @ApiProperty({
    description: 'Subject Object',
    example: {
      id: '02f1815b-3da9-45d9-9aba-7a2f87cef7d7',
      name: 'Math',
    },
    required: true,
  })
  @IsNotEmpty()
  public readonly subject: SubjectDto;

  @ApiProperty({
    description: 'Level Object',
    example: {
      id: '02f1815b-3da9-45d9-9aba-7a2f87cef7d7',
      name: '1',
    },
    required: true,
  })
  @IsNotEmpty()
  public readonly level: LevelDto;
}
