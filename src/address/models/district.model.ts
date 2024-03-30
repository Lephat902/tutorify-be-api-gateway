import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Province } from './province.model';

@ObjectType()
export class District {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @HideField()
  readonly administrativeUnitId: number;

  @Field(() => Province)
  readonly province: Province;
}
