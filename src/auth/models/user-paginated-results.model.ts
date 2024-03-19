import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserPaginatedResults {
  @Field()
  totalCount: number;

  @Field(() => [User])
  results: User[];
}
