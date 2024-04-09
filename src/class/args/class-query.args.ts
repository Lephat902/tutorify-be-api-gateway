import {
  ArgsType,
  Field,
  HideField,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ClassOrderBy, ClassStatus, UserMakeRequest } from '@tutorify/shared';
import { Expose } from 'class-transformer';
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
  @Field(() => [String], {
    nullable: true,
    description: "Ids of classes",
  })
  ids: string[];

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
  @Field(() => [ClassStatus], {
    nullable: true,
    description: 'Statuses of classes in the results',
  })
  statuses: ClassStatus[];

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Set to true if you want to narrow results to online classes, false for in-person classes',
  })
  isOnline: boolean;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Prioritize classes that are nearest to this ward',
  })
  wardId: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Prioritize classes that are nearest to this district',
  })
  districtId: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Prioritize classes that are nearest to this province',
  })
  provinceId: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Return only classes that belongs to this user (whether he is tutor or student)',
    name: 'userId',
  })
  // If Expose not used, it will be whitelisted
  @Expose({ name: 'userId' })
  userIdToGetClasses: string;

  @HideField()
  userMakeRequest: UserMakeRequest;
}
