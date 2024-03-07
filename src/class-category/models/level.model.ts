import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Level {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
