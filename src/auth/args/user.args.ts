import {
  ArgsType,
  Field,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { Gender, TutorOrderBy, UserRole } from '@tutorify/shared';
import { IsBoolean, IsOptional } from 'class-validator';
import { ToBoolean } from 'src/common/decorators';
import { PaginationArgs, SortingDirectionArgs } from 'src/common/graphql';

registerEnumType(TutorOrderBy, {
  name: 'TutorOrderBy',
});

@ArgsType()
export class UserArgs extends IntersectionType(
  PaginationArgs,
  SortingDirectionArgs,
) {
  @IsOptional()
  @Field({
    nullable: true,
    description: 'Query string for first name, last name, username',
  })
  q?: string;

  @IsOptional()
  @Field(() => Gender, {
    nullable: true,
    description: 'Gender of user',
  })
  gender?: Gender;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Whether or not include email-not-verified users',
    defaultValue: false,
  })
  includeEmailNotVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  @Field({
    nullable: true,
    description: 'Whether or not include blocked users',
    defaultValue: false,
  })
  includeBlocked?: boolean;

  @IsOptional()
  @Field(() => UserRole, {
    nullable: true,
    description: 'Role of user',
  })
  role?: UserRole;
}
