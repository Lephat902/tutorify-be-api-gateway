import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({
    description: 'content of the feedback',
    example: 'This is the content of the feedback',
    required: true,
  })
  @IsNotEmpty()
  public readonly text: string;

  @ApiProperty({
    description: 'Rating of the tutor',
    example: 4.0,
    required: true,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  public readonly rate: number;
}
