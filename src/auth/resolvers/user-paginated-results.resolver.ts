import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { UserQueryArgs } from '../args';
import { UserPaginatedResults } from '../models/user-paginated-results.model';

@Resolver(() => UserPaginatedResults)
export class UserPaginatedResultsResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Query(() => UserPaginatedResults, { name: 'users' })
  async getUsersAndTotalCount(
    @Args() filters: UserQueryArgs,
  ) {
    return this.authService.getUsersAndTotalCount(filters);
  }
}
