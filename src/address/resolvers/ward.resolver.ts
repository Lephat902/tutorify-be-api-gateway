import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ward } from '../models';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => Ward)
export class WardResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) { }

  @Query(() => Ward, { name: 'ward' })
  async getWardById(@Args('id') wardId: string) {
    return this.addressProxy.getFullAddressByWardCode(wardId);
  }

  @Query(() => [Ward], { name: 'wards' })
  async getAllWards(@Args('districtCode') districtCode: string) {
    return this.addressProxy.getAllWards(districtCode);
  }
}