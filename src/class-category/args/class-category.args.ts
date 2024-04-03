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
}
