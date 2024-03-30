import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { District } from './district.model';

@ObjectType()
export class Ward {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @HideField()
  readonly administrativeUnitId: number;

  @Field(() => District)
  readonly district: District;
}
