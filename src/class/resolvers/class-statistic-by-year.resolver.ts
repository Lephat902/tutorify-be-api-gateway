import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import {
  UserRole
} from '@tutorify/shared';
import { TokenType } from 'src/auth/auth.interfaces';
import { TokenRequirements } from 'src/auth/decorators';
import { TokenGuard } from 'src/auth/guards';
import { StatisticByYear } from 'src/common/graphql';
import { ClassService } from '../class.service';
import { ClassStatisticByYearArgs } from '../args';

@Resolver(() => StatisticByYear)
@UseGuards(TokenGuard)
export class ClassStatisticByYearResolver {
  constructor(
    private readonly classService: ClassService,
  ) { }

  @Query(() => [StatisticByYear], { name: 'classStatisticByYear', nullable: true })
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  async getClassStatisticByYear(@Args() classStatisticArgs: ClassStatisticByYearArgs) {
    return this.classService.getClassStatisticByYear(classStatisticArgs);
  }
}