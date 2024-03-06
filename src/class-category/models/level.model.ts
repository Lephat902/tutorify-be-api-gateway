import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Level {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
