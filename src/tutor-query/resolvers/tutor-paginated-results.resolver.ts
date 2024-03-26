import { Resolver, Query, Args } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { TutorQueryArgs } from '../args';
import { TutorQueryPaginatedResults } from '../models/tutor-paginated-results.model';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { Token } from 'src/auth/decorators';

@Resolver(() => TutorQueryPaginatedResults)
@UseGuards(TokenGuard)
export class TutorPaginatedResultsResolver {
  constructor(
    private readonly tutorService: TutorQueryService,
  ) { }

  @Query(() => TutorQueryPaginatedResults, { name: 'tutors' })
  async getTutorsAndTotalCount(
    @Args() filters: TutorQueryArgs,
    @Token() token: IAccessToken,
  ) {
    filters.userMakeRequest = {
      userId: token?.id
    };
    return this.tutorService.getTutorsAndTotalCount(filters);
  }
}
