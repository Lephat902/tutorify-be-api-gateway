import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Province } from '../models';
import { AddressService } from '../address.service';
import { administrativeUnitsMap } from '../constants';

@Resolver(() => Province)
export class ProvinceResolver {
  constructor(
    private readonly addressService: AddressService,
  ) {}

  @Query(() => [Province], { name: 'provinces' })
  async getAllProvinces() {
    return this.addressService.getAllProvinces();
  }

  @ResolveField('nameWithShortAdministrativeUnitVi', () => String, {
    nullable: true,
    description: 'Get province name with short Vietnamese adminstrative unit, such as Thành phố Thủ Đức',
  })
  async getProvinceWithAdministrativeUnitShortNameVi(
    @Parent() province: Province,
  ) {
    const { administrativeUnitId, name } = province;
    const administrativeUnitShortNameVi = administrativeUnitsMap.get(administrativeUnitId).shortName;
    return `${administrativeUnitShortNameVi} ${name}`;
  }

  @ResolveField('nameWithShortAdministrativeUnitEn', () => String, {
    nullable: true,
    description: 'Get province name with short English adminstrative unit, such as Thủ Đức City',
  })
  async getProvinceWithAdministrativeUnitShortNameEn(
    @Parent() province: Province,
  ) {
    const { administrativeUnitId, name } = province;
    const administrativeUnitShortNameEn = administrativeUnitsMap.get(administrativeUnitId).shortNameEn;
    return `${name} ${administrativeUnitShortNameEn}`;
  }
}