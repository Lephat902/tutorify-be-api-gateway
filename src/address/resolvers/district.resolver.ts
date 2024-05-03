import { Resolver, Query, Args } from '@nestjs/graphql';
import { District } from '../models';
import { AddressProxy } from '@tutorify/shared';
import { AddressFindOptionArgs } from '../args';

@Resolver(() => District)
export class DistrictResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) {}

  @Query(() => District, { name: 'district' })
  async getDistrictById(@Args() addressFindOptionArgs: AddressFindOptionArgs) {
    if (addressFindOptionArgs.id) {
      return this.addressProxy.getFullAddressByDistrictCode(addressFindOptionArgs.id);
    } else if (addressFindOptionArgs.slug) {
      return this.addressProxy.getFullAddressByDistrictSlug(addressFindOptionArgs.slug);
    }
    return null;
  }

  @Query(() => [District], { name: 'districts' })
  async getAllDistricts(@Args('districtCode') districtCode: string) {
    return this.addressProxy.getAllDistricts(districtCode);
  }
}