import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class District {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;
}
