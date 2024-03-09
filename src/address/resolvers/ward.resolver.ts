import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ward } from '../models';
import { AddressService } from '../address.service';

@Resolver(() => Ward)
export class WardResolver {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Query(() => [Ward], { name: 'wards' })
  async getAllWards(@Args('districtCode') districtCode: string) {
    return this.addressService.getAllWards(districtCode);
  }
}