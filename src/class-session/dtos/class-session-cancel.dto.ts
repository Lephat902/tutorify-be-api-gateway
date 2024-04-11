import {
    IsString,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassSessionCancelDto {
    @ApiProperty({
        description: 'Description of the class session',
        example: "I just have my legs broken",
        required: false,
    })
    @IsOptional()
    @IsString()
    cancelReason?: string;
}
