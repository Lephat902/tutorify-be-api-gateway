import { Resolver, Query, Args } from '@nestjs/graphql';
import { District } from '../models';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => District)
export class DistrictResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) {}

  @Query(() => District, { name: 'district' })
  async getDistrictById(@Args('id') districtId: string) {
    return this.addressProxy.getFullAddressByDistrictCode(districtId);
  }

  @Query(() => [District], { name: 'districts' })
  async getAllDistricts(@Args('districtCode') districtCode: string) {
    return this.addressProxy.getAllDistricts(districtCode);
  }
}