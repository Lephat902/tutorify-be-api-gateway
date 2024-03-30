import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Ward } from '../models';
import { AddressService } from '../address.service';
import { administrativeUnitsMap } from '../constants';

@Resolver(() => Ward)
export class WardResolver {
  constructor(
    private readonly addressService: AddressService,
  ) { }

  @Query(() => [Ward], { name: 'wards' })
  async getAllWards(@Args('districtCode') districtCode: string) {
    return this.addressService.getAllWards(districtCode);
  }

  @ResolveField('nameWithShortAdministrativeUnitVi', () => String, {
    nullable: true,
    description: 'Get ward name with short Vietnamese adminstrative unit, such as Phường 02',
  })
  async getWardWithAdministrativeUnitShortNameVi(
    @Parent() ward: Ward,
  ) {
    const { administrativeUnitId, name } = ward;
    const administrativeUnitShortNameVi = administrativeUnitsMap.get(administrativeUnitId).shortName;
    return `${administrativeUnitShortNameVi} ${name}`;
  }

  @ResolveField('nameWithShortAdministrativeUnitEn', () => String, {
    nullable: true,
    description: 'Get ward name with short English adminstrative unit, such as Ward 02',
  })
  async getWardWithAdministrativeUnitShortNameEn(
    @Parent() ward: Ward,
  ) {
    const { administrativeUnitId, name } = ward;
    const administrativeUnitShortNameEn = administrativeUnitsMap.get(administrativeUnitId).shortNameEn;
    return `${administrativeUnitShortNameEn} ${name}`;
  }
}