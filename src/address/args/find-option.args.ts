import {
  ArgsType,
  Field
} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class AddressFindOptionArgs {
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  id: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  slug: string;
}
