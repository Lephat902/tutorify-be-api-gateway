export class ProvinceResponseDto {
  readonly id: string;
  readonly name: string;
}

export class FullProvinceResponseDto {
  readonly id: string;
  readonly name: string;
  readonly nameEn: string;
  readonly fullName: string;
  readonly fullNameEn: string;
  readonly codeName: string;
  readonly administrativeUnitId: number;
  readonly administrativeRegionId: number;
}
