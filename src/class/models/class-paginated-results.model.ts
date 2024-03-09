import { Field, ObjectType } from '@nestjs/graphql';
import { Class } from './class.model';

@ObjectType()
export class ClassPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [Class])
  results: Class[];
}
