import { Controller, Get, Param, Query} from '@nestjs/common';
import { AddressService } from './address.service';
import { DistrictResponseDto, FullDistrictResponseDto, FullProvinceResponseDto, FullWardResponseDto, ProvinceResponseDto, WardResponseDto } from './dtos';
import {  ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags('Address')
export class AddressController {
    constructor(private readonly addressService: AddressService) { }

    @ApiOperation({ summary: "Get all provinces." })
    @Get('provinces')
    async getAllProvinces(): Promise<ProvinceResponseDto[]> {
        return this.addressService.getAllProvinces();
    }

    @ApiOperation({ summary: "Get all districts based on the province's code." })
    @Get('provinces/:code/districts')
    async getAllDistricts(@Param('code') provinceCode: string): Promise<DistrictResponseDto[]> {
        return this.addressService.getAllDistricts(provinceCode);
    }

    @ApiOperation({ summary: "Get all wards based on the district's code." })
    @Get('districts/:code/wards')
    async getAllWards(@Param('code') districtCode: string): Promise<WardResponseDto[]> {
        return this.addressService.getAllWards(districtCode);
    }

    @ApiOperation({ summary: "Get a province by its code." })
    @Get('provinces/:code/')
    async getProvinceByCode(@Param('code') provinceCode: string): Promise<FullProvinceResponseDto> {
        return this.addressService.getProvinceByCode(provinceCode);
    }

    @ApiOperation({ summary: "Get a district by its code." })
    @Get('districts/:code/')
    async getDistrictByCode(@Param('code') districtCode: string): Promise<FullDistrictResponseDto> {
        return this.addressService.getDistrictByCode(districtCode);
    }

    @ApiOperation({ summary: "Get a ward by its code." })
    @Get('wards/:code/')
    async getWardByCode(@Param('code') wardCode: string): Promise<FullWardResponseDto> {
        return this.addressService.getWardByCode(wardCode);
    }

    @ApiOperation({ summary: "Get a ward by its code." })
    @Get('geolocation')
    async getGeoLocation(@Query('address') address: string, @Query('ward-code')wardCode: string)  {
        return this.addressService.getGeoLocation(address, wardCode);
    }
}
