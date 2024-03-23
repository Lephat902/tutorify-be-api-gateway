import { Field, ObjectType } from '@nestjs/graphql';
import { Feedback } from './feedback.model';

@ObjectType()
export class FeedbackQueryPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [Feedback])
  results: Feedback[];
}
