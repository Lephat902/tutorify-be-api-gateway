import { ApiProperty } from "@nestjs/swagger";
import { Weekday } from "@tutorify/shared";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export class ClassTimeSlotDto {

    @ApiProperty({ example: '00:00' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format. Time should be in HH:mm format.' })
    startTime: string;

    @ApiProperty({ example: '23:59' })
    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format. Time should be in HH:mm format.' })
    endTime: string;

    @ApiProperty({ enum: Weekday, enumName: 'Weekday' })
    @IsNotEmpty()
    @IsEnum(Weekday)
    weekday: Weekday;
}
