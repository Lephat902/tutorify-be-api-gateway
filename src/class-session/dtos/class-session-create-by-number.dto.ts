import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClassSessionCreateByQtyDto {
  @ApiProperty({
    description: 'Number of sessions want to create',
    example: 3,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  numberOfSessions: number;
}
