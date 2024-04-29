import {
    Field,
    HideField,
    InputType
} from '@nestjs/graphql';
import {
    ClassSessionStatus,
    UserMakeRequest
} from '@tutorify/shared';
import { IsOptional } from 'class-validator';

@InputType()
export class ClassQueryInput {
    @HideField()
    limit?: number;

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