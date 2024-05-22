import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  UserRole
} from '@tutorify/shared';
import { TokenType } from 'src/auth/auth.interfaces';
import { TokenRequirements } from 'src/auth/decorators';
import { TokenGuard } from 'src/auth/guards';
import { StatisticByYear } from 'src/common/graphql';
import { UserStatisticByYearArgs } from '../args';
import { AuthService } from '../auth.service';

@Resolver(() => StatisticByYear)
@UseGuards(TokenGuard)
export class UserStatisticByYearResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Query(() => [StatisticByYear], { name: 'userStatisticByYear', nullable: true })
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  async getUserStatisticByYear(@Args() userStatisticArgs: UserStatisticByYearArgs) {
    return this.authService.getUserStatisticByYear(userStatisticArgs);
  }
}