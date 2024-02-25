import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Subject } from '.';

@ObjectType()
export class Level {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Subject], {
    nullable: true,
    description: 'All subjects compatible with this level.'
  })
  subjects?: Subject[];
}
