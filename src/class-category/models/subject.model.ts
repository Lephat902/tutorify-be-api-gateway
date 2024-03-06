import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subject {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
