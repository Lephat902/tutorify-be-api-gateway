import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
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
    if (filters?.me) {
      if (!token?.id)
        return { results: [], totalCount: 0 };
    }
    filters.userId = token?.id;
    filters.isTutor = token?.roles[0] === UserRole.TUTOR;
    return this.classService.getClassesAndTotalCount(filters);
  }
}
