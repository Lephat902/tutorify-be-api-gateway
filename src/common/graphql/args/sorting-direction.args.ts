import { ArgsType, Field } from '@nestjs/graphql';
import { SortingDirection } from '@tutorify/shared';
import { IsOptional } from 'class-validator';

@ArgsType()
export class SortingDirectionArgs {
    @IsOptional()
    @Field({
        nullable: true,
        defaultValue: SortingDirection.ASC,
        description: 'The sorting direction'
    })
    readonly dir?: SortingDirection;
}