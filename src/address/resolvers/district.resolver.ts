import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { District } from '../models';
import { AddressService } from '../address.service';
import { administrativeUnitsMap } from '../constants';

@Resolver(() => District)
export class DistrictResolver {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Query(() => [District], { name: 'districts' })
  async getAllDistricts(@Args('districtCode') districtCode: string) {
    return this.addressService.getAllDistricts(districtCode);
  }

  @ResolveField('nameWithShortAdministrativeUnitVi', () => String, {
    nullable: true,
    description: 'Get district name with short Vietnamese adminstrative unit, such as Quận 01',
    deprecationReason: "fullName available"
  })
  async getDistrictWithAdministrativeUnitShortNameVi(
    @Parent() district: District,
  ) {
    const { administrativeUnitId, name } = district;
    const administrativeUnitShortNameVi = administrativeUnitsMap.get(administrativeUnitId).shortName;
    return `${administrativeUnitShortNameVi} ${name}`;
  }

  @ResolveField('nameWithShortAdministrativeUnitEn', () => String, {
    nullable: true,
    description: 'Get district name with short English adminstrative unit, such as District 01',
    deprecationReason: "fullName available"
  })
  async getDistrictWithAdministrativeUnitShortNameEn(
    @Parent() district: District,
  ) {
    const { administrativeUnitId, name } = district;
    const administrativeUnitShortNameEn = administrativeUnitsMap.get(administrativeUnitId).shortNameEn;
    return `${administrativeUnitShortNameEn} ${name}`;
  }
}