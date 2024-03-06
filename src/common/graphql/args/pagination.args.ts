import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, IsPositive, IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @IsPositive()
  @IsOptional()
  @Field(() => Int, {
    nullable: true,
    defaultValue: 1,
    description: 'Page, start from 1',
  })
  readonly page?: number;

  @IsPositive()
  @Max(20)
  @Field(() => Int, {
    nullable: true,
    defaultValue: 10,
    description: 'Limit, default is 10',
  })
  readonly limit?: number;
}
