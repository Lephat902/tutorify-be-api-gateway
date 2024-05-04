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
    return this.addressProxy.getFullAddressByWardCode(wardId);
  }

  @ResolveField('googleMapAddress', () => String, {
    nullable: true,
    description: 'Google Maps URL',
  })
  async getGoogleMapAddress(
    @Parent() tutor: TutorQuery,
  ) {
    const { location } = tutor;
    if (!location?.coordinates?.length) {
      return null;
    }
    // Geometry: longitude first, then latitude
    const lon = location.coordinates[0];
    const lat = location.coordinates[1];
    // Google Maps: latitude first, then longitude
    return `https://www.google.com/maps?q=${lat},${lon}`;
  }
}
