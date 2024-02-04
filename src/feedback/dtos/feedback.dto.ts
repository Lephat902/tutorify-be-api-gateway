import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

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
    @IsNumber()
    public readonly rate: number;
  
    @ApiProperty({
      description: 'Student\'s id',
      example: '1',
      required: true,
    })
    @IsNotEmpty()
    public readonly studentId: string;
  }