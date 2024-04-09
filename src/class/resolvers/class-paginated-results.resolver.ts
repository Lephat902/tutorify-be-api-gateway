import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { ClassQueryArgs } from '../args';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassPaginatedResults } from '../models/class-paginated-results.model';
import { Token } from 'src/auth/decorators';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { UserRole } from '@tutorify/shared';

@Resolver(() => ClassPaginatedResults)
@UseGuards(TokenGuard)
export class ClassPaginatedResultsResolver {
  constructor(
    private readonly classService: ClassService,
  ) { }

  @Query(() => ClassPaginatedResults, { name: 'classes' })
  async getClassesAndTotalCount(
    @Args() filters: ClassQueryArgs,
    @Token() token: IAccessToken,
  ): Promise<ClassPaginatedResults> {
    const userId = token?.id;
    const userRole = token?.roles[0];
    // If user wants to query classes of a specific user
    // then he would be a manager/admin
    if (filters.userIdToGetClasses) {
      if (!(userRole === UserRole.MANAGER || userRole === UserRole.ADMIN)) {
        throw new ForbiddenException();
      }
    }
    // If user want to query 'my' classes but not logged in yet 
    // then return empty results immediately
    if (filters.me) {
      if (!userId)
        throw new ForbiddenException();
      filters.userIdToGetClasses = userId;
    }
    // Assigning user metadata
    filters.userMakeRequest = {
      userId,
      userRole
    };

    return this.classService.getClassesAndTotalCount(filters);
  }
}
