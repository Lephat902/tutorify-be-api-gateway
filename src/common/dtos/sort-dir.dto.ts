import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

enum SortingDirectionEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}
export class SortingDirectionDto {
    @IsOptional()
    @ApiProperty({
        description: 'The sorting direction',
        enum: SortingDirectionEnum,
        required: false,
    })
    readonly dir?: SortingDirectionEnum = SortingDirectionEnum.ASC;
}