import { IsString, IsNotEmpty, IsOptional, IsDate, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderPref, TutorPositionPref } from './enums';

export class ClassCreateDto {
    @ApiProperty({
        description: 'The categories associated with the class',
        type: () => [String],
        example: ['d48f22f9-72db-4109-a7e6-3e32c2751a88', 'd48f22f9-72db-4109-a7e6-3e32c2751a88']
    })
    @IsNotEmpty()
    classCategoryIds: string[];

    @ApiProperty({ description: 'Description of the class', example: 'Math tutoring for high school students' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ description: 'Any specific requirements for the class', example: 'Previous experience with tutoring' })
    @IsOptional()
    @IsString()
    requirement?: string;

    @ApiProperty({ description: 'The start date of the class', type: Date, required: false, example: '2024-03-01' })
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @ApiProperty({ description: 'The end date of the class', type: Date, required: false, example: '2024-06-30' })
    @IsOptional()
    @IsDate()
    endDate?: Date;

    @ApiProperty({ description: 'The wages offered for the class', required: false, example: 25 })
    @IsOptional()
    @IsNumber()
    wages?: number;

    @ApiProperty({ description: 'The address where the class will be held', required: false, example: '123 Main Street' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'The ID of the ward where the class will be held', required: false, example: 'Ward001' })
    @IsOptional()
    @IsString()
    wardId?: string;

    @ApiProperty({ description: 'Indicates if the class will be conducted online or not', example: true })
    @IsNotEmpty()
    @IsBoolean()
    isOnline: boolean;

    @ApiProperty({ description: 'The number of students expected for the class', example: 10 })
    @IsNotEmpty()
    @IsNumber()
    studentQty: number;

    @ApiProperty({
        description: 'Preferred position of the tutor for the class',
        enum: TutorPositionPref,
        enumName: 'TutorPositionPref',
        required: false,
        example: 'TEACHER'
    })
    @IsOptional()
    @IsEnum(TutorPositionPref)
    tutorPositionPref?: TutorPositionPref;

    @ApiProperty({
        description: 'Preferred gender of the tutor for the class',
        enum: GenderPref,
        enumName: 'GenderPref',
        required: false,
        example: 'MALE'
    })
    @IsOptional()
    @IsEnum(GenderPref)
    tutorGenderPref?: GenderPref;
}
