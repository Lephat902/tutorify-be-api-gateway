import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { UserQueryArgs } from '../args';
import { UserPaginatedResults } from '../models/user-paginated-results.model';
import { TokenGuard } from '../guards';
import { UseGuards } from '@nestjs/common';
import { TokenType } from '../auth.interfaces';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements } from '../decorators';

@Resolver(() => UserPaginatedResults)
@UseGuards(TokenGuard)
export class UserPaginatedResultsResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @TokenRequirements(TokenType.CLIENT, [UserRole.MANAGER, UserRole.ADMIN])
  @Query(() => UserPaginatedResults, { name: 'users' })
  async getUsersAndTotalCount(
    @Args() filters: UserQueryArgs,
  ) {
    return this.authService.getUsersAndTotalCount(filters);
  }
}
