import { PaginationArgs, SortingArg } from "../../common/graphql";
import {ArgsType, IntersectionType, Field} from '@nestjs/graphql'
import {IsOptional} from 'class-validator'

@ArgsType()
export class FeedbackQueryArg extends IntersectionType(
    PaginationArgs,
    SortingArg,
){
  @IsOptional()
  @Field( {
    nullable: true,
    description: "Feedbacks' tutor's id",
  })
  tutorId?: string;

  @IsOptional()
  @Field( {
    nullable: true,
    description: "A query string used to narrow down results based on a case-insensitive match within the feedback\'s text",
  })
  q?: string;
} 