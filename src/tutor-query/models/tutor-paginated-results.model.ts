import { Field, ObjectType } from '@nestjs/graphql';
import { TutorQuery } from './tutor-query.model';

@ObjectType()
export class TutorQueryPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [TutorQuery])
  results: TutorQuery[];
}
