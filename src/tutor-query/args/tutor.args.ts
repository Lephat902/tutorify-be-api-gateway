import { ArgsType, Field, HideField, OmitType, registerEnumType } from '@nestjs/graphql';
import { TutorOrderBy } from '@tutorify/shared';
import { IsOptional, Min } from 'class-validator';
import { UserQueryArgs } from 'src/auth/args';

registerEnumType(TutorOrderBy, {
  name: 'TutorOrderBy',
});

@ArgsType()
export class TutorQueryArgs extends OmitType(UserQueryArgs, ['role', 'order'] as const) {
  @IsOptional()
  @Field({
    nullable: true,
    description: 'Whether or not include not approved tutors',
    defaultValue: false,
  })
  includeNotApproved: boolean;

  @IsOptional()
  @Field(() => TutorOrderBy, {
    nullable: true,
    description: 'Order attribute of tutor',
  })
  order: TutorOrderBy;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Whether or not include tutors with no feedbacks when sorting feedbacks',
    defaultValue: false,
  })
  showZeroFeedbacksTutorsInRatingSorting: boolean;

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Categories's ids that tutors are proficient in",
  })
  classCategoryIds: string[];

  @IsOptional()
  @Field(() => [String], {
    nullable: true,
    description: "Categories's slugs that tutors are proficient in",
  })
  classCategorySlugs: string[];

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
  @Min(0)
  @Field({
    nullable: true,
    description: 'Minimum wage range for tutors',
    defaultValue: 0,
  })
  minWage: number;

  @IsOptional()
  @Min(0)
  @Field({
    nullable: true,
    description: 'Maximum wage range for tutors',
  })
  maxWage: number;

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
    description: 'Prioritize classes that are nearest to this ward',
  })
  wardSlug: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Prioritize classes that are nearest to this district',
  })
  districtSlug: string;

  @IsOptional()
  @Field(() => String, {
    nullable: true,
    description: 'Prioritize classes that are nearest to this province',
  })
  provinceSlug: string;

  @HideField()
  userMakeRequest: UserMakeRequest;
}

interface UserMakeRequest {
  userId: string;
}