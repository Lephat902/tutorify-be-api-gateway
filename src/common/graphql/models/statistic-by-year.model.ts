import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticByYear {
  @Field(() => ID)
  timeIntervalIndex: string;

  @Field({ nullable: false })
  count: string;
}
