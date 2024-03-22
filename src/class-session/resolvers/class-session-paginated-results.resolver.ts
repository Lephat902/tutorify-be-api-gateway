import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassSessionQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { Token } from 'src/auth/decorators';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { ClassSessionService } from '../class-session.service';
import { ClassSessionPaginatedResults } from '../models';

@Resolver(() => ClassSessionPaginatedResults)
@UseGuards(TokenGuard)
export class ClassSessionPaginatedResultsResolver {
  constructor(
    private readonly classSessionService: ClassSessionService,
  ) { }

  @Query(() => ClassSessionPaginatedResults, { name: 'classSessions' })
  async getClassSessionsAndTotalCount(
    @Args() filters: ClassSessionQueryArgs,
    @Token() token: IAccessToken,
  ): Promise<ClassSessionPaginatedResults> {
    return this.classSessionService.getClassSessionsAndTotalCount(filters);
  }
}
