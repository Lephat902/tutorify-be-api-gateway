import {
    Field,
    HideField,
    InputType,
    Int,
} from '@nestjs/graphql';
import { IsOptional, IsPositive, Max } from 'class-validator';
import {
    ClassSessionOrderBy,
    ClassSessionStatus,
    SortingDirection,
    UserMakeRequest
} from '@tutorify/shared';

@InputType()
export class ClassQueryInput {
    @IsPositive()
    @IsOptional()
    @Field(() => Int, {
        nullable: true,
        defaultValue: 1,
        description: 'Page, start from 1',
    })
    page?: number;

    @IsPositive()
    @Max(20)
    @Field(() => Int, {
        nullable: true,
        defaultValue: 10,
        description: 'Limit, default is 10',
    })
    limit?: number;

    @IsOptional()
    @Field({
        nullable: true,
        defaultValue: SortingDirection.ASC,
        description: 'The sorting direction',
    })
    dir?: SortingDirection;

    @IsOptional()
    @Field(() => ClassSessionOrderBy, {
        nullable: true,
        description: 'The sorting attribute',
    })
    order: ClassSessionOrderBy;

    @IsOptional()
    @Field(() => Date, {
        nullable: true,
        description: 'Query sessions that start after this time (inclusive)',
    })
    startTime: Date;

    @IsOptional()
    @Field(() => Date, {
        nullable: true,
        description: 'Query sessions that end before this time (inclusive)',
    })
    endTime: Date;

    @IsOptional()
    @Field(() => [ClassSessionStatus], {
        nullable: true,
        description: 'Statuses of class sessions in the results',
    })
    statuses: ClassSessionStatus[];

    @HideField()
    userMakeRequest: UserMakeRequest;
}