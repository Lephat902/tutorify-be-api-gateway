import { Field, ID, ObjectType } from '@nestjs/graphql';
import { District } from './district.model';

@ObjectType()
export class Ward {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field(() => District)
  readonly district: District;
}
