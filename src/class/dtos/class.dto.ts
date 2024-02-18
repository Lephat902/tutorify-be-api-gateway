import { ApiProperty } from '@nestjs/swagger';
import { ClassCategoryDto } from 'src/class-category/dtos';
import { GenderPref, TutorPositionPref } from '@tutorify/shared';
import { ClassTimeSlotDto } from './class-timeslot.dto';

export class ClassDto {
    @ApiProperty({ description: 'The ID of the class', example: '123abc' })
    id: string;

    @ApiProperty({ description: 'The ID of the student who owns the class', example: '123abc' })
    studentId: string;

    @ApiProperty({ description: 'The ID of the tutor who teaches the class', example: '123abc' })
    tutorId: string;

    @ApiProperty({ description: 'The categories associated with the class', type: () => [ClassCategoryDto], example: [{ name: 'Math' }, { name: 'Science' }] })
    classCategories: ClassCategoryDto[];

    @ApiProperty({ description: 'Description of the class', example: 'Math tutoring for high school students' })
    description: string;

    @ApiProperty({ description: 'Any specific requirements for the class', example: 'Previous experience with tutoring' })
    requirement: string;

    @ApiProperty({ description: 'The start date of the class', type: Date, required: false, example: '2024-03-01' })
    startDate?: Date;

    @ApiProperty({ description: 'The end date of the class', type: Date, required: false, example: '2024-06-30' })
    endDate?: Date;

    @ApiProperty({ description: 'The wages offered for the class', required: false, example: 25 })
    wages?: number;

    @ApiProperty({ description: 'The address where the class will be held', required: false, example: '123 Main Street' })
    address: string;

    @ApiProperty({ description: 'The ID of the ward where the class will be held', required: false, example: 'Ward001' })
    wardId: string;

    @ApiProperty({ description: 'Indicates if the class will be conducted online or not', example: true })
    isOnline: boolean;

    @ApiProperty({ description: 'The number of students expected for the class', example: 10 })
    studentQty: number;

    @ApiProperty({ description: 'Preferred position of the tutor for the class', enum: TutorPositionPref, enumName: 'TutorPositionPref', required: false, example: 'TEACHER' })
    tutorPositionPref: TutorPositionPref;

    @ApiProperty({ description: 'Preferred gender of the tutor for the class', enum: GenderPref, enumName: 'GenderPref', example: 'MALE' })
    tutorGenderPref: GenderPref;

    @ApiProperty({ description: 'The categories associated with the class', type: () => [ClassCategoryDto], example: [{ name: 'Math' }, { name: 'Science' }] })
    timeSlots: ClassTimeSlotDto[];
}
