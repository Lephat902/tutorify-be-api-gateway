import { IsNotEmpty } from 'class-validator';
import { LevelDto, SubjectDto } from '.';
import { ApiProperty } from '@nestjs/swagger';

export class ClassCategoryInsertDto {
  @ApiProperty({
    description: 'Subject Object',
    example: {
      id: '845958e5-3b8b-47db-a817-896f62e399c0',
      name: 'Math',
    },
    required: true,
  })
  @IsNotEmpty()
  public readonly subject: SubjectDto;

  @ApiProperty({
    description: 'Level Object',
    example: {
      id: '845958e5-3b8b-47db-a817-896f62e399c0',
      name: '1',
    },
    required: true,
  })
  @IsNotEmpty()
  public readonly level: LevelDto;
}
