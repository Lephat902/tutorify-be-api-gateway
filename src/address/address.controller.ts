import { Controller, Get, Param, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import {
  DistrictResponseDto,
  FullDistrictResponseDto,
  FullProvinceResponseDto,
  FullWardResponseDto,
  ProvinceResponseDto,
  WardResponseDto,
} from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @ApiOperation({ summary: 'Get all provinces.' })
  @Get('provinces')
  async getAllProvinces(): Promise<ProvinceResponseDto[]> {
    return this.addressService.getAllProvinces();
  }

  @ApiOperation({ summary: "Get all districts based on the province's id." })
  @Get('provinces/:provinceId/districts')
  async getAllDistricts(
    @Param('provinceId') provinceId: string,
  ): Promise<DistrictResponseDto[]> {
    return this.addressService.getAllDistricts(provinceId);
  }

  @ApiOperation({ summary: "Get all wards based on the district's id." })
  @Get('districts/:districtId/wards')
  async getAllWards(
    @Param('districtId') districtId: string,
  ): Promise<WardResponseDto[]> {
    return this.addressService.getAllWards(districtId);
  }

  @ApiOperation({ summary: 'Get a province by its id.' })
  @Get('provinces/:provinceId/')
  async getProvinceByCode(
    @Param('provinceId') provinceId: string,
  ): Promise<FullProvinceResponseDto> {
    return this.addressService.getProvinceByCode(provinceId);
  }

  @ApiOperation({ summary: 'Get a district by its id.' })
  @Get('districts/:districtId/')
  async getDistrictByCode(
    @Param('districtId') districtId: string,
  ): Promise<FullDistrictResponseDto> {
    return this.addressService.getDistrictByCode(districtId);
  }

  @ApiOperation({ summary: 'Get a ward by its id.' })
  @Get('wards/:wardId/')
  async getWardByCode(
    @Param('wardId') wardId: string,
  ): Promise<FullWardResponseDto> {
    return this.addressService.getWardByCode(wardId);
  }

  @ApiOperation({ summary: 'Get geo-coded location of an address.' })
  @Get('geolocation')
  async getGeoLocation(
    @Query('address') address: string,
    @Query('wardId') wardId: string,
  ) {
    return this.addressService.getGeoLocation(address, wardId);
  }
}
