import { ApiProperty } from '@nestjs/swagger';
import { SortingDirection } from '@tutorify/shared';
import { IsOptional } from 'class-validator';

export class SortingDirectionDto {
  @IsOptional()
  @ApiProperty({
    description: 'The sorting direction',
    enum: SortingDirection,
    required: false,
  })
  readonly dir?: SortingDirection = SortingDirection.ASC;
}
