import {
  ArgsType,
  Field,
  HideField,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { ClassSessionOrderBy, ClassSessionStatus, UserMakeRequest } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
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
  q: string;

  @IsOptional()
  @Field({
    nullable: true,
    description:
      'Id of the class that sessions belong to, default to all classes possible',
  })
  classId: string;

  @IsOptional()
  @Field(() => ClassSessionOrderBy, {
    nullable: true,
    description: 'The sorting attribute',
  })
  order: ClassSessionOrderBy;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Query sessions that start after this time (inclusive)',
  })
  startTime: Date;

  @IsOptional()
  @Field(() => Date, {
    nullable: true,
    description: 'Query sessions that end before this time (inclusive)',
  })
  endTime: Date;

  @IsOptional()
  @Field(() => [ClassSessionStatus], {
    nullable: true,
    description: 'Statuses of class sessions in the results',
  })
  statuses: ClassSessionStatus[];

  @HideField()
  userMakeRequest: UserMakeRequest;
}
