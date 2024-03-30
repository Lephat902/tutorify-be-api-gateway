import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Province {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @HideField()
  readonly administrativeUnitId: number;
}
