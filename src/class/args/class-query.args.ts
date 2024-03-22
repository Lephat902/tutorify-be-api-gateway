import {
  ArgsType,
  Field,
  HideField,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ClassOrderBy } from '@tutorify/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from 'src/common/decorators';
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
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Only include my result',
  })
  me: boolean;

  @IsOptional()
  @IsString()
  @Field({
    nullable: true,
    description: 'Query string',
  })
  q: string;

  @IsOptional()
  @Field(() => ClassOrderBy, {
    nullable: true,
    description: 'The sorting attribute',
  })
  order: ClassOrderBy;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Classes' ids Categories classes categorized to",
  })
  classCategoryIds: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Subjects' ids classes categorized to",
  })
  subjectIds: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Levels' ids classes categorized to",
  })
  levelIds: string[];

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Include hidden classes',
  })
  includeHidden: boolean;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Return only assigned/unassigned classes',
  })
  isAssigned: boolean;

  @HideField()
  userId: string;
}
