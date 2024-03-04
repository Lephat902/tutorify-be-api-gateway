import { Inject, Injectable } from '@nestjs/common';
import {DistrictResponseDto, FullDistrictResponseDto, FullProvinceResponseDto, FullWardResponseDto, ProvinceResponseDto, WardResponseDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames, } from '@tutorify/shared';

@Injectable()
export class AddressService {
    constructor(
        @Inject(QueueNames.ADDRESS) private readonly client: ClientProxy,
    ) { }

    async getAllProvinces(): Promise<ProvinceResponseDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getAllProvinces' }, {}));
    }

    async getAllDistricts(provinceCode: string): Promise<DistrictResponseDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getAllDistricts' }, provinceCode));
    }

    async getAllWards(districtCode: string): Promise<WardResponseDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getAllWards' }, districtCode));
    }

    async getProvinceByCode(provinceCode: string): Promise<FullProvinceResponseDto> {
        return firstValueFrom(this.client.send({ cmd: 'getProvinceByCode' }, provinceCode));
    }

    async getDistrictByCode(districtCode: string): Promise<FullDistrictResponseDto> {
        return firstValueFrom(this.client.send({ cmd: 'getDistrictByCode' }, districtCode));
    }

    async getWardByCode(wardCode: string): Promise<FullWardResponseDto> {
        return firstValueFrom(this.client.send({ cmd: 'getWardByCode' }, wardCode));
    }

    async getGeoLocation(address: string, wardCode: string){
        return firstValueFrom(this.client.send({ cmd: 'getGeoLocation' }, {address, wardCode}));
    }
}
