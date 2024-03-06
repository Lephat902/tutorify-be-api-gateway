import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDirectionDto } from 'src/common/dtos';
import { ClassOrderBy } from '@tutorify/shared';
import { Transform } from 'class-transformer';
import { ToBoolean } from 'src/common/decorators';

export class ClassQueryDto extends IntersectionType(
  PaginationDto,
  SortingDirectionDto,
) {
  @IsOptional()
  @ApiProperty({
    description: 'Query string',
    required: false,
  })
  readonly q?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The sorting attribute',
    enum: ClassOrderBy,
    required: false,
  })
  readonly order?: ClassOrderBy;

  @IsOptional()
  @ApiProperty({
    description: "Classes' ids Categories classes categorized to",
    required: false,
    type: String,
    isArray: true,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  readonly classCategoryIds?: string[];

  @IsOptional()
  @ApiProperty({
    description: "Subjects' ids classes categorized to",
    required: false,
    type: String,
    isArray: true,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  readonly subjectIds?: string[];

  @IsOptional()
  @ApiProperty({
    description: "Levels' ids classes categorized to",
    required: false,
    type: String,
    isArray: true,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  readonly levelIds?: string[];

  @IsOptional()
  @ApiProperty({
    description: 'Include hidden classes',
    required: false,
  })
  @IsBoolean()
  @ToBoolean()
  readonly includeHidden?: boolean;
}
