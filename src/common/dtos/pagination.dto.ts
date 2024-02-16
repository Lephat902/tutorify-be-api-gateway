import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max, IsPositive } from 'class-validator';

export class PaginationDto {
    @IsPositive()
    @Type(() => Number)
    @ApiProperty({
        description: 'Page, start from 1',
        required: false,
    })
    readonly page?: number = 1;

    @IsPositive()
    @Max(20)
    @Type(() => Number)
    @ApiProperty({
        description: 'Limit, default is 10',
        required: false,
    })
    readonly limit?: number = 10;
}