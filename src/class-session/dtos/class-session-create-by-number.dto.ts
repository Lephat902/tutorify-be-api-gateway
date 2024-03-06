import { IsInt, IsNotEmpty, IsPositive, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassSessionCreateByQtyDto {
  @ApiProperty({
    description: 'Number of sessions want to create',
    example: 3,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @Max(10)
  numberOfSessions: number;
}
