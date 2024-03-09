export class WardResponseDto {
  readonly id: string;
  readonly name: string;
}

export class FullWardResponseDto {
  readonly id: string;
  readonly name: string;
  readonly nameEn: string;
  readonly fullName: string;
  readonly fullNameEn: string;
  readonly codeName: string;
  readonly administrativeUnitId: number;
}
