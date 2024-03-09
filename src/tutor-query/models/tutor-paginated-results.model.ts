import { Field, ObjectType } from '@nestjs/graphql';
import { Tutor } from './tutor.model';

@ObjectType()
export class TutorPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [Tutor])
  results: Tutor[];
}
