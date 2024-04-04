import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
  IsInt,
  Max,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateGreaterThanToday,
  IsDateWithinNDaysFromToday,
  ToBoolean,
  ToStartOfDay,
} from 'src/common/decorators';
import { ClassTimeSlotDto } from 'src/class/dtos/class-timeslot.dto';
import { FileObject } from 'src/common/dtos';

const today = new Date();
const dayAfterToday14Days = new Date();
dayAfterToday14Days.setDate(today.getDate() + 14);

export class ClassSessionCreateDto {
  @ApiProperty({
    description: 'Description of the class session',
    example: '<p>Title or topic of the class session.</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Title of the class session',
    example: 'Chapter 1: Software Architecture Introduction',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Start date of the FIRST class session.',
    format: 'date',
    example: today,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDateGreaterThanToday()
  @ToStartOfDay()
  startDate: Date;

  @ApiProperty({
    isArray: true,
    type: ClassTimeSlotDto,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ClassTimeSlotDto)
  timeSlots: ClassTimeSlotDto[];

  @ApiProperty({
    description:
      'Number of sessions to be created for recurring class sessions.',
    example: 3,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Max(10)
  numberOfSessionsToCreate?: number;

  @ApiProperty({
    description:
      'End date for creating recurring class sessions. Sessions will be created until this date.',
    format: 'date',
    example: dayAfterToday14Days,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDateGreaterThanToday()
  @IsDateWithinNDaysFromToday(30)
  @ToStartOfDay()
  endDateForRecurringSessions?: Date;

  @ApiProperty({
    description:
      'Physical address where the class session will be held, if applicable.',
    example: '123 Main Street',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description:
      'ID of the ward or location where the class session will be held, if applicable.',
    example: 'Ward001',
    required: false,
  })
  @IsOptional()
  @IsString()
  wardId?: string;

  @ApiProperty({
    description:
      'Indicates whether the class session will be conducted online (true) or in-person (false).',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({
    description: 'If this is set to true, use class address by default',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  useDefaultAddress: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'Array of files associated with the FIRST class session, if any.',
    type: [FileObject],
    required: false,
  })
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => FileObject)
  materials: FileObject[];
}
