import { Resolver, Query } from '@nestjs/graphql';
import { Province } from '../models';
import { AddressService } from '../address.service';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Query(() => [Province], { name: 'provinces' })
  async getAllProvinces() {
    return this.addressService.getAllProvinces();
  }
}