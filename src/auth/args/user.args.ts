import {
  ArgsType,
  Field,
  IntersectionType,
  registerEnumType,
} from '@nestjs/graphql';
import { Gender, UserOrder, UserRole } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
import { PaginationArgs, SortingDirectionArgs } from 'src/common/graphql';

registerEnumType(UserOrder, {
  name: 'UserOrder',
});

@ArgsType()
export class UserQueryArgs extends IntersectionType(
  PaginationArgs,
  SortingDirectionArgs,
) {
  @IsOptional()
  @Field(() => UserOrder, {
    nullable: true,
    description: 'Order attribute of user',
  })
  order: UserOrder;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Query string for first name, email, username, id',
  })
  q: string;

  @IsOptional()
  @Field(() => Gender, {
    nullable: true,
    description: 'Gender of user',
  })
  gender: Gender;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Filters users by block status. True for blocked, false for otherwise, null for both.',
  })
  emailVerified: boolean;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Filters users by block status. True for blocked, false for otherwise, null for both.',
  })
  isBlocked: boolean;

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Filters tutors by approvement status. True for approved, false for pending, null for both.',
  })
  isApproved: boolean;

  @IsOptional()
  @Field(() => UserRole, {
    nullable: true,
    description: 'Role of user',
  })
  role: UserRole;
}
