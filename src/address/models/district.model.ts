import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Province } from './province.model';

@ObjectType()
export class District {
  @Field(() => ID)
  readonly id: string;

  @Field(() => ID)
  readonly slug: string;

  @Field()
  readonly name: string;

  @Field()
  readonly nameEn: string;

  @Field()
  readonly fullName: string;

  @Field()
  readonly fullNameEn: string;

  @HideField()
  readonly administrativeUnitId: number;

  @Field(() => Province)
  readonly province: Province;
}
