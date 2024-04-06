import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { TutorQuery } from '../models';
import { Ward } from 'src/address/models';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => TutorQuery)
export class TutorResolver {
  constructor(
    private readonly tutorQueryService: TutorQueryService,
    private readonly addressProxy: AddressProxy,
  ) { }

  @Query(() => TutorQuery, { name: 'tutor', nullable: true })
  async getTutorsAndTotalCount(@Args('id') id: string) {
    return this.tutorQueryService.getTutorById(id);
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() tutor: TutorQuery,
  ) {
    const { wardId } = tutor;
    return this.addressProxy.getWardHierarchyById(wardId);
  }
}
