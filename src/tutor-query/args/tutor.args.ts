import { ArgsType, Field, OmitType, registerEnumType } from '@nestjs/graphql';
import { TutorOrderBy } from '@tutorify/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';
import { UserArgs } from 'src/auth/args';
import { ToBoolean } from 'src/common/decorators';

registerEnumType(TutorOrderBy, {
  name: 'TutorOrderBy',
});

@ArgsType()
export class TutorArgs extends OmitType(UserArgs, ['role'] as const) {
  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Whether or not include not approved tutors',
    defaultValue: false,
  })
  includeNotApproved?: boolean;

  @IsOptional()
  @Field(() => TutorOrderBy, {
    nullable: true,
    description: 'Order attribute of user',
  })
  order?: TutorOrderBy;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Classes' ids Categories classes categorized to",
  })
  classCategoryIds?: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Subjects' ids classes categorized to",
  })
  subjectIds?: string[];

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @Field(() => [String], {
    nullable: true,
    description: "Levels' ids classes categorized to",
  })
  levelIds?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field({
    nullable: true,
    description: 'Minimum wage range for tutors',
    defaultValue: 0,
  })
  minWage?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Field({
    nullable: true,
    description: 'Maximum wage range for tutors',
  })
  maxWage?: number;
}
