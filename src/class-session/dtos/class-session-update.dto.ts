import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsArray,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateGreaterThanToday,
} from 'src/common/decorators';
import { FileObject } from 'src/common/dtos';

const today = new Date();
const dateTimeAfter1Hour = new Date();
dateTimeAfter1Hour.setHours(today.getHours() + 1);

export class ClassSessionUpdateDto {
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
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Start datetime class session.',
    format: 'date',
    example: today,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDateGreaterThanToday()
  startDatetime: Date;

  @ApiProperty({
    description: 'End datetime class session.',
    format: 'date',
    example: dateTimeAfter1Hour,
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDateGreaterThanToday()
  endDatetime: Date;

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
    required: false,
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

  @ApiProperty({
    description: 'Array of files associated with the FIRST class session, if any.',
    type: [FileObject],
    required: false,
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => FileObject)
  materials: FileObject[];

  @ApiProperty({
    description: 'The summary feedback of the tutor to the session',
    example: 'He is a bit naughty today',
    required: false,
  })
  @IsOptional()
  @IsString()
  tutorFeedback?: string;

  @ApiHideProperty()
  isCancelled?: boolean;
}
