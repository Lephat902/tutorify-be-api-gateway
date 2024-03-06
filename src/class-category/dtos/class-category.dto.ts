import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { SubjectDto } from './subject.dto';
import { LevelDto } from './level.dto';

export class ClassCategoryDto {
  @ApiProperty({
    description: "Class Category's ID",
    example: '02f1815b-3da9-45d9-9aba-7a2f87cef7d7',
    required: false,
  })
  @IsUUID()
  public readonly id: string;

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
