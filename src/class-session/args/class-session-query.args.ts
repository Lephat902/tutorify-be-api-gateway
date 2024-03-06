import {
  ArgsType,
  Field,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ClassSessionOrderBy } from '@tutorify/shared';
import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from 'src/common/decorators';
import { PaginationArgs, SortingDirectionArgs } from 'src/common/graphql';

registerEnumType(ClassSessionOrderBy, {
  name: 'ClassSessionOrderBy',
});

@ArgsType()
export class ClassSessionQueryArgs extends IntersectionType(
  PaginationArgs,
  SortingDirectionArgs,
) {
  @IsOptional()
  @Field({
    nullable: true,
    description: 'Query string for session title and description',
  })
  q?: string;

  @IsOptional()
  @Field({
    nullable: true,
    description:
      'Id of the class that sessions belong to, default to all classes possible',
  })
  classId?: string;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Display cancelled class session or not (both by default)',
  })
  isCancelled?: boolean;

  @IsOptional()
  @Field(() => ClassSessionOrderBy, {
    nullable: true,
    description: 'The sorting attribute',
  })
  order?: ClassSessionOrderBy;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Query sessions that start after this time (inclusive)',
  })
  startTime?: Date;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Query sessions that end before this time (inclusive)',
  })
  endTime?: Date;
}
