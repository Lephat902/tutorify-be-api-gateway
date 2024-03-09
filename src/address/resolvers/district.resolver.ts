import { Resolver, Query, Args } from '@nestjs/graphql';
import { District } from '../models';
import { AddressService } from '../address.service';

@Resolver(() => District)
export class DistrictResolver {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Query(() => [District], { name: 'districts' })
  async getAllDistricts(@Args('provinceCode') provinceCode: string) {
    return this.addressService.getAllDistricts(provinceCode);
  }
}