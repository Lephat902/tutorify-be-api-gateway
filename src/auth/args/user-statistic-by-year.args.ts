import {
  ArgsType,
  Field
} from '@nestjs/graphql';
import { UserRole } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
import { StatisticArgs } from 'src/common/graphql';

@ArgsType()
export class UserStatisticByYearArgs extends StatisticArgs {
  @IsOptional()
  @Field({
    defaultValue: false,
    nullable: true,
    description: 'Return short month name',
  })
  shortMonthName: boolean;

  @IsOptional()
  @Field(() => [UserRole], {
    nullable: true,
    description: 'Roles of users in the results',
  })
  roles: UserRole[];

  @IsOptional()
  @Field({
    nullable: true,
    description: 'Approvement status of tutor application',
  })
  isApproved: boolean;
}
