import { Field, ObjectType } from '@nestjs/graphql';
import { ClassSession } from './class-session.model';

@ObjectType()
export class ClassSessionPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [ClassSession])
  results: ClassSession[];
}
