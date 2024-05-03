import { Resolver, Query, Args } from '@nestjs/graphql';
import { Province } from '../models';
import { AddressProxy } from '@tutorify/shared';
import { AddressFindOptionArgs } from '../args';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) {}

  @Query(() => Province, { name: 'province' })
  async getProvinceByProvinceIdById(@Args() addressFindOptionArgs: AddressFindOptionArgs) {
    if (addressFindOptionArgs.id) {
      return this.addressProxy.getProvinceByProvinceId(addressFindOptionArgs.id);
    } else if (addressFindOptionArgs.slug) {
      return this.addressProxy.getProvinceByProvinceSlug(addressFindOptionArgs.slug);
    }
    return null;
  }

  @Query(() => [Province], { name: 'provinces' })
  async getAllProvinces() {
    return this.addressProxy.getAllProvinces();
  }
}