import { FeedbackSortBy, SortingDirection } from "@tutorify/shared";
import {ArgsType, Field, registerEnumType} from '@nestjs/graphql'
import { IsOptional } from 'class-validator';

registerEnumType(SortingDirection, {
  name: 'SortingDirection',
});

registerEnumType(FeedbackSortBy, {
  name: 'FeedbackSortBy',
});


@ArgsType()
export class SortingArg {
    @IsOptional()
    @Field(() => FeedbackSortBy, {
      nullable: true,
      description: 'Sort attribute of feedback',
      defaultValue: FeedbackSortBy.CREATED_AT,
    })
    readonly sort?: FeedbackSortBy;

    @IsOptional()
    @Field({
      nullable: true,
      defaultValue: SortingDirection.DESC,
      description: 'The sorting direction',
    })
    readonly dir?: SortingDirection;
}