import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Province {
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
}
