import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddressProxy } from '@tutorify/shared';

@Controller()
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressProxy: AddressProxy) { }

  @ApiOperation({ summary: 'Get geo-coded location of an address.' })
  @Get('geolocation')
  async getGeocodeFromAddressAndWardId(
    @Query('address') address: string,
    @Query('wardId') wardId: string,
  ) {
    return this.addressProxy.getGeocodeFromAddressAndWardId(address, wardId);
  }
}
