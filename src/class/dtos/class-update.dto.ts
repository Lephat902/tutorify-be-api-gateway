import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { ClassCreateDto } from '.';
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, ValidateIf, ValidateNested } from 'class-validator';
import { ClassTimeSlotDto } from './class-timeslot.dto';
import { Type } from 'class-transformer';

export class ClassUpdateDto extends OmitType(ClassCreateDto, [
  'desiredTutorIds',
] as const) {
  @ApiProperty({
    description: 'The categories associated with the class',
    type: () => [String],
    example: [
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
      'd48f22f9-72db-4109-a7e6-3e32c2751a88',
    ],
  })
  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @ArrayNotEmpty()
  classCategoryIds: string[];

  @ApiProperty({
    description: 'Indicates if the class will be conducted online or not',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isOnline: boolean;

  @ApiProperty({
    description: 'The number of students expected for the class',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  studentQty: number;

  @ApiProperty({ type: [ClassTimeSlotDto] })
  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ClassTimeSlotDto)
  timeSlots: ClassTimeSlotDto[];

  @ApiHideProperty()
  isHidden: boolean;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiHideProperty()
  userMakeRequest: string;
}
