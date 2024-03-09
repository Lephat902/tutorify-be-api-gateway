import { ReportStatus, ReportType } from '@tutorify/shared';
import { ApiProperty } from '@nestjs/swagger';

const exampleCreatedDate = new Date();
const exampleEndDate = new Date(exampleCreatedDate);
exampleEndDate.setDate(exampleEndDate.getDate() + 7);

exampleCreatedDate.setHours(0, 0, 0, 0);
exampleEndDate.setHours(0, 0, 0, 0);

export class ReportResponseDto {
  @ApiProperty({
    description: 'The id of report',
    required: false,
  })
  readonly id: number;

  @ApiProperty({
    description: 'The id of report',
    example: 1,
  })
  readonly reason: string;

  @ApiProperty({
    description: 'The created date of the report',
    format: 'date',
    type: Date,
    required: false,
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Type of the report',
    enum: ReportType,
    enumName: 'ReportType',
    example: 'FEEDBACK',
  })
  readonly type: ReportType;

  @ApiProperty({
    description: 'Status of the report',
    enum: ReportStatus,
    enumName: 'ReportStatus',
    required: false,
  })
  readonly status: ReportStatus;

  @ApiProperty({ description: 'The ID of the user who reported', example: '123abc' })
  readonly userId: string;

  @ApiProperty({ description: 'The ID of the entity reported', example: '123abc' })
  readonly entityId: string;
}
