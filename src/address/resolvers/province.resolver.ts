import { Resolver, Query, Args } from '@nestjs/graphql';
import { Province } from '../models';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) {}

  @Query(() => Province, { name: 'province' })
  async getProvinceById(@Args('id') provinceId: string) {
    return this.addressProxy.getProvinceByProvinceCode(provinceId);
  }

  @Query(() => [Province], { name: 'provinces' })
  async getAllProvinces() {
    return this.addressProxy.getAllProvinces();
  }
}