export class DistrictResponseDto {
  readonly id: string;
  readonly name: string;
}

export class FullDistrictResponseDto {
  id: string;
  name: string;
  nameEn: string;
  fullName: string;
  fullNameEn: string;
  codeName: string;
  administrativeUnitId: number;
}
