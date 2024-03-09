import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDirectionDto } from 'src/common/dtos';
import { ReportOrderBy, ReportType } from '@tutorify/shared';

export class ReportQueryDto extends IntersectionType(
  PaginationDto,
  SortingDirectionDto,
) {

  @ApiProperty({
    description: 'Query string',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly q?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The sorting attribute',
    enum: ReportOrderBy,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReportOrderBy)
  readonly order?: ReportOrderBy;

  @ApiProperty({
    description: 'Type of reports',
    enum: ReportType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ReportType)
  readonly reportType?: ReportType;
}
