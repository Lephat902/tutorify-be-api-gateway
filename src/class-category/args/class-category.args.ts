import {
  ArgsType,
  Field,
} from '@nestjs/graphql';
import { ClassStatus } from '@tutorify/shared';
import { IsOptional } from 'class-validator';



@ArgsType()
export class ClassCategoryQueryArgs {
  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: "A query string used to narrow down results based on a case-insensitive match within the class category's subject and level.",
  })
  q: string;

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Ids of class categories",
  })
  ids: string[];

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Unique name of class categories",
  })
  slugs: string[];

  @IsOptional()
  @Field(() => [ClassStatus], {
    nullable: true,
    description: `Statuses of classes to be counted in classCount`,
  })
  classStatuses: ClassStatus[];

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Count hidden classes in classCount',
  })
  includeHiddenClass: boolean;

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
