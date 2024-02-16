import { IsOptional } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDirectionDto } from 'src/common/dtos';
import { ClassOrderBy } from './enums/class-order-by.enum';

export class ClassQueryDto extends IntersectionType(
    PaginationDto,
    SortingDirectionDto,
) {
    // @Transform(({ value }) => value.split(',').map(Number))
    // @IsOptional()
    // @IsPositive({ each: true })
    // readonly ids?: string;

    @IsOptional()
    @ApiProperty({
        description: 'Query string',
        required: false,
    })
    readonly q?: string;

    @IsOptional()
    @ApiProperty({
        description: 'The sorting attribute', 
        enum: ClassOrderBy,
        required: false,
    })
    readonly order?: ClassOrderBy;

    //   @IsOptional()
    //   @IsBoolean()
    //   @Transform(({ value }) => (value === 'false' ? false : value !== undefined))
    //   readonly isActive?: boolean;
}