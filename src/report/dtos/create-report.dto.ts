import { ReportType } from '@tutorify/shared';
import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsNotEmpty, IsEnum} from 'class-validator';

export class CreateReportDto {
  @ApiProperty({
    description: 'The id of report',
    example: 1,
  })
  @IsString()
  readonly reason: string;

  @ApiProperty({
    description: 'Type of the report',
    enum: ReportType,
    enumName: 'ReportType',
    example: ReportType.FEEDBACK,
  })
  @IsEnum(ReportType)
  readonly type: ReportType;

  @ApiProperty({ description: 'The ID of the user who reported', example: '123abc' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ description: 'The ID of the entity reported', example: '123abc' })
  @IsString()
  @IsNotEmpty()
  readonly entityId: string;
}
