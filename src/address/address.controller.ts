import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressProxy } from '@tutorify/shared';
import { District, Province, Ward } from './models';

@Controller()
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressProxy: AddressProxy) { }

  @ApiOperation({ summary: 'Get all provinces.' })
  @Get('provinces')
  async getAllProvinces(): Promise<Province[]> {
    return this.addressProxy.getAllProvinces();
  }

  @ApiOperation({ summary: "Get all districts based on the province's id." })
  @Get('provinces/:provinceId/districts')
  async getAllDistricts(
    @Param('provinceId') provinceId: string,
  ): Promise<Omit<District, 'province'>[]> {
    return this.addressProxy.getAllDistricts(provinceId);
  }

  @ApiOperation({ summary: "Get all wards based on the district's id." })
  @Get('districts/:districtId/wards')
  async getAllWards(
    @Param('districtId') districtId: string,
  ): Promise<Omit<Ward, 'district'>[]> {
    return this.addressProxy.getAllWards(districtId);
  }

  @ApiOperation({ summary: 'Get geo-coded location of an address.' })
  @Get('geolocation')
  async getGeocodeFromAddressAndWardId(
    @Query('address') address: string,
    @Query('wardId') wardId: string,
  ) {
    return this.addressProxy.getGeocodeFromAddressAndWardId(address, wardId);
  }
}
