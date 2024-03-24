import {
  ArgsType,
  Field,
  HideField,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ClassOrderBy } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
import { PaginationArgs, SortingDirectionArgs } from 'src/common/graphql';

registerEnumType(ClassOrderBy, {
  name: 'ClassOrderBy',
});

@ArgsType()
export class ClassQueryArgs extends IntersectionType(
  PaginationArgs,
  SortingDirectionArgs,
) {
  @IsOptional()
  @Field({
    nullable: true,
    description: 'Only include my result',
  })
  me: boolean;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'A query string used to narrow down results based on a case-insensitive match within the class\'s title or description.',
  })
  q: string;

  @IsOptional()
  @Field(() => ClassOrderBy, {
    nullable: true,
    description: 'The sorting attribute',
  })
  order: ClassOrderBy;

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Classes' ids Categories classes categorized to",
  })
  classCategoryIds: string[];

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Subjects' ids classes categorized to",
  })
  subjectIds: string[];

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Levels' ids classes categorized to",
  })
  levelIds: string[];

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Include hidden classes',
  })
  includeHidden: boolean;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Return only assigned/unassigned classes',
  })
  isAssigned: boolean;

  @HideField()
  userId: string;

  @HideField()
  isTutor: boolean;
}