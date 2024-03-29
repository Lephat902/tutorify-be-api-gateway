import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassSessionQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ClassSessionService } from '../class-session.service';
import { ClassSessionPaginatedResults } from '../models';

@Resolver(() => ClassSessionPaginatedResults)
@UseGuards(TokenGuard)
export class ClassSessionPaginatedResultsResolver {
  constructor(
    private readonly classSessionService: ClassSessionService,
  ) { }

  @Query(() => ClassSessionPaginatedResults, { name: 'classSessions' })
  @TokenRequirements(TokenType.CLIENT, [])
  async getClassSessionsAndTotalCount(
    @Args() filters: ClassSessionQueryArgs,
    @Token() token: IAccessToken,
  ): Promise<ClassSessionPaginatedResults> {
    filters.userMakeRequest = {
      userId: token.id,
      userRole: token.roles[0],
    }
    return this.classSessionService.getClassSessionsAndTotalCount(filters);
  }
}
