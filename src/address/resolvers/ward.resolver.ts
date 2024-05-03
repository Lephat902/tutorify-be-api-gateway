import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ward } from '../models';
import { AddressProxy } from '@tutorify/shared';
import { AddressFindOptionArgs } from '../args';

@Resolver(() => Ward)
export class WardResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) { }

  @Query(() => Ward, { name: 'ward' })
  async getWardById(@Args() addressFindOptionArgs: AddressFindOptionArgs) {
    if (addressFindOptionArgs.id) {
      return this.addressProxy.getFullAddressByWardCode(addressFindOptionArgs.id);
    } else if (addressFindOptionArgs.slug) {
      return this.addressProxy.getFullAddressByWardSlug(addressFindOptionArgs.slug);
    }
    return null;
  }

  @Query(() => [Ward], { name: 'wards' })
  async getAllWards(@Args('districtCode') districtCode: string) {
    return this.addressProxy.getAllWards(districtCode);
  }
}