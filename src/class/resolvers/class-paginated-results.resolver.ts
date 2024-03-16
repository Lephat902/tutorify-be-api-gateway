import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassPaginatedResults } from '../models/class-paginated-results.model';
import { Token } from 'src/auth/decorators';
import { IAccessToken } from 'src/auth/auth.interfaces';

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
  ) {
    if (filters?.me) {
      filters.userId = token?.id;
      delete filters.me;
    }
    return this.classService.getClassesAndTotalCount(filters);
  }
}
