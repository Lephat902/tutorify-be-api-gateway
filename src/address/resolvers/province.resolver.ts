import { Resolver, Query } from '@nestjs/graphql';
import { Province } from '../models';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(
    private readonly addressProxy: AddressProxy,
  ) {}

  @Query(() => [Province], { name: 'provinces' })
  async getAllProvinces() {
    return this.addressProxy.getAllProvinces();
  }
}