import {
  ArgsType,
  Field,
} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class ClassCategoryQueryArgs {
  @IsOptional()
  @Field({
    nullable: true,
    description: `Set to true if you want to include classCount to each class category.
    Note that it will automatically sort the results based on the classCount.`,
  })
  includeClassCount: boolean;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: `Min creation date of class of this category`,
  })
  classCreatedAtMin: Date;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: `Max creation date of class of this category`,
  })
  classCreatedAtMax: Date;
}
