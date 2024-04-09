import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ClassSessionService } from '../class-session.service';
import { ShortClassPaginatedResults } from '../models';
import { ClassSessionStatus } from '@tutorify/shared';

@Resolver(() => ShortClassPaginatedResults)
@UseGuards(TokenGuard)
export class ShortClassPaginatedResultsResolver {
  constructor(
    private readonly classSessionService: ClassSessionService,
  ) { }

  @Query(() => ShortClassPaginatedResults, { name: 'upcomingClasses' })
  @TokenRequirements(TokenType.CLIENT, [])
  async getUpcomingClasses(
    @Args() filters: ClassQueryArgs,
    @Token() token: IAccessToken,
  ): Promise<ShortClassPaginatedResults> {
    filters.userMakeRequest = {
      userId: token.id,
      userRole: token.roles[0],
    }
    filters.statuses = [ClassSessionStatus.SCHEDULED];
    return this.classSessionService.getClassesBySessionFilters(filters);
  }
}
