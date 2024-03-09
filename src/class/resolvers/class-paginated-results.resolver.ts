import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassPaginatedResults } from '../models/class-paginated-results.model';

@Resolver(() => ClassPaginatedResults)
@UseGuards(TokenGuard)
export class ClassPaginatedResultsResolver {
  constructor(
    private readonly classService: ClassService,
  ) {}

  @Query(() => ClassPaginatedResults, { name: 'classes' })
  async getClassesAndTotalCount(@Args() filters: ClassQueryArgs) {
    const a = await this.classService.getClassesAndTotalCount(filters);
    console.log(a);
    return a;
  }
}
