import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { District } from './district.model';

@ObjectType()
export class Ward {
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

  @Field(() => District)
  readonly district: District;
}
