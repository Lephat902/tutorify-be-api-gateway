import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
  IsEnum,
  ArrayNotEmpty,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderPref, TutorPositionPref } from '@tutorify/shared';
import { ClassTimeSlotDto } from './class-timeslot.dto';
import { Type } from 'class-transformer';

const exampleStartDate = new Date();
const exampleEndDate = new Date(exampleStartDate);
exampleEndDate.setDate(exampleEndDate.getDate() + 7);

exampleStartDate.setHours(0, 0, 0, 0);
exampleEndDate.setHours(0, 0, 0, 0);

export class ClassCreateDto {
  @ApiProperty({
    description: 'The categories associated with the class',
    type: () => [String],
    example: [
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  classCategoryIds: string[];

  @ApiProperty({
    description: 'Description of the class',
    example: 'Math tutoring for high school students',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Any specific requirements for the class',
    example: 'Previous experience with tutoring',
  })
  @IsOptional()
  @IsString()
  requirement?: string;

  @ApiProperty({
    description: 'The start date of the class',
    format: 'date',
    type: Date,
    required: false,
    example: exampleStartDate,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @ApiProperty({
    description: 'The end date of the class',
    format: 'date',
    type: Date,
    required: false,
    example: exampleEndDate,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @ApiProperty({
    description: 'The wages offered for the class',
    required: false,
    example: 25,
  })
  @IsOptional()
  @IsNumber()
  wages?: number;

  @ApiProperty({
    description: 'The address where the class will be held',
    required: false,
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'The ID of the ward where the class will be held',
    required: false,
    example: '00001',
  })
  @IsOptional()
  @IsString()
  wardId?: string;

  @ApiProperty({
    description: 'Indicates if the class will be conducted online or not',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({
    description: 'The number of students expected for the class',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  studentQty: number;

  @ApiProperty({
    description: 'Preferred position of the tutor for the class',
    enum: TutorPositionPref,
    enumName: 'TutorPositionPref',
    required: false,
    example: 'TEACHER',
  })
  @IsOptional()
  @IsEnum(TutorPositionPref)
  tutorPositionPref?: TutorPositionPref;

  @ApiProperty({
    description: 'Preferred gender of the tutor for the class',
    enum: GenderPref,
    enumName: 'GenderPref',
    required: false,
    example: 'MALE',
  })
  @IsOptional()
  @IsEnum(GenderPref)
  tutorGenderPref?: GenderPref;

  @ApiProperty({ type: [ClassTimeSlotDto] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  timeSlots: ClassTimeSlotDto[];

  @IsOptional()
  @ApiProperty({
    description: "List of desired tutors' id",
    type: () => [String],
    example: [
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5, {
    message: 'Desired tutors list length must be shorter than or equal 5',
  })
  desiredTutorIds?: string[];

  @ApiProperty({
    description: 'The background image of the class',
    required: false,
    example:
      'https://img.freepik.com/premium-photo/asian-students-taking-exam_33745-1142.jpg',
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
