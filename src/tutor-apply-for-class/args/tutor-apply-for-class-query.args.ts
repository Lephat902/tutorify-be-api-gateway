import {
  ArgsType,
  Field,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ApplicationStatus, TutorApplyForClassOrderBy } from '@tutorify/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from 'src/common/decorators';
import { PaginationArgs, SortingDirectionArgs } from 'src/common/graphql';

registerEnumType(TutorApplyForClassOrderBy, {
  name: 'TutorApplyForClassOrderBy',
});

@ArgsType()
export class TutorApplyForClassArgs extends IntersectionType(
  PaginationArgs,
  SortingDirectionArgs,
) {
  @IsOptional()
  @Field(() => TutorApplyForClassOrderBy, {
    nullable: true,
    description: 'The sorting attribute',
  })
  readonly order?: TutorApplyForClassOrderBy;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [ApplicationStatus], {
    nullable: true,
    description: 'Statuses of Class that the result is desired to narrow to',
  })
  readonly applicationStatuses?: ApplicationStatus[];

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description:
      'Retrieve classes that one either applies for or is designated to',
  })
  readonly isDesignated?: boolean;
}
