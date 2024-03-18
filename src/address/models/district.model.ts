import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Province } from './province.model';

@ObjectType()
export class District {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field(() => Province)
  readonly province: Province;
}
