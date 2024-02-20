import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto, SortingDirectionDto } from 'src/common/dtos';
import { ApplicationStatus, TutorApplyForClassOrderBy } from '@tutorify/shared';
import { Transform } from 'class-transformer';
import { ToBoolean } from 'src/common/decorators';

export class TutorApplyForClassQueryDto extends IntersectionType(
    PaginationDto,
    SortingDirectionDto,
) {
    @IsOptional()
    @ApiProperty({
        description: 'The sorting attribute',
        enum: TutorApplyForClassOrderBy,
        required: false,
    })
    readonly order?: TutorApplyForClassOrderBy;

    @IsOptional()
    @ApiProperty({
        description: "Statuses of Class that the result is desired to narrow to",
        required: false,
        type: ApplicationStatus,
        isArray: true,
    })
    @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
    readonly applicationStatuses?: ApplicationStatus[];

    @IsOptional()
    @ApiProperty({
        description: 'Retrieve classes that one either applies for or is designated to',
        required: false,
    })
    @IsBoolean()
    @ToBoolean()
    readonly isDesignated?: boolean;
}