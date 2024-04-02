import { Inject, Injectable } from '@nestjs/common';
import {
  DistrictResponseDto,
  FullDistrictResponseDto,
  FullProvinceResponseDto,
  FullWardResponseDto,
  ProvinceResponseDto,
  WardResponseDto,
} from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class AddressService {
  constructor(
    @Inject(QueueNames.ADDRESS) private readonly client: ClientProxy,
  ) { }

  async getAllProvinces(): Promise<ProvinceResponseDto[]> {
    return firstValueFrom(this.client.send({ cmd: 'getAllProvinces' }, {}));
  }

  async getAllDistricts(provinceId: string): Promise<DistrictResponseDto[]> {
    return firstValueFrom(
      this.client.send({ cmd: 'getAllDistricts' }, provinceId),
    );
  }

  async getAllWards(districtId: string): Promise<WardResponseDto[]> {
    return firstValueFrom(
      this.client.send({ cmd: 'getAllWards' }, districtId),
    );
  }

  async getProvinceByCode(
    provinceId: string,
  ): Promise<FullProvinceResponseDto> {
    return firstValueFrom(
      this.client.send({ cmd: 'getProvinceByCode' }, provinceId),
    );
  }

  async getDistrictByCode(
    districtId: string,
  ): Promise<FullDistrictResponseDto> {
    return firstValueFrom(
      this.client.send({ cmd: 'getDistrictByCode' }, districtId),
    );
  }

  async getWardByCode(wardId: string): Promise<FullWardResponseDto> {
    return firstValueFrom(this.client.send({ cmd: 'getWardByCode' }, wardId));
  }

  async getWardHierarchyById(wardId: string) {
    if (!wardId) return null;
    return firstValueFrom(
      this.client.send({ cmd: 'getFullAddressByWardCode' }, wardId)
    );
  }

  async getGeocodeFromAddressAndWardId(address: string, wardId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'getGeocodeFromAddressAndWardId' }, {
        address,
        wardId,
      }),
    );
  }
}
