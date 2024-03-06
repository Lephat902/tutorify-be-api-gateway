import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ToBoolean } from 'src/common/decorators';

export class ClassSessionCreateDto {
  @ApiProperty({
    description: 'Description of the class session',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
    description: 'Start datetime of the class session',
    format: 'date-time',
    example: '2024-03-02T10:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startDatetime: Date;

  @ApiProperty({
    description: 'End datetime of the class session',
    format: 'date-time',
    example: '2024-03-02T11:00:00Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endDatetime: Date;

  @ApiProperty({
    description: 'Address where the class session will be held',
    example: '123 Main Street',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'ID of the ward where the class session will be held',
    example: 'Ward001',
    required: false,
  })
  @IsOptional()
  @IsString()
  wardId?: string;

  @ApiProperty({
    description:
      'Indicates if the class session will be conducted online or not',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  @ToBoolean()
  isOnline: boolean;

  @ApiProperty({
    description: 'Description of each class session material',
    type: 'array',
    items: { type: 'string' },
    example: [
      'Chapter 1: Software Architecture Introduction',
      'Chapter 1 Exercise',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  materialDescription?: string[];

  // Any validation here has no effect for File type, this line just facilitates uploading file in swagger-ui
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  files?: Array<Express.Multer.File>;

  @ApiProperty({
    description: 'Feedback for the tutor after the class session',
    example: 'The students showed great improvement',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  tutorFeedback: string;
}
