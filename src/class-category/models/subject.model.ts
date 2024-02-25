import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Level } from '.';

@ObjectType()
export class Subject {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => [Level], {
    nullable: true,
    description: 'All levels compatible with this subject.'
  })
  levels?: Level[];
}