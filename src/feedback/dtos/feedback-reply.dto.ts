import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FeedbackReplyDto {
    @ApiProperty({
      description: 'content of the feedback reply',
      example: 'This is the content of the feedback reply',
      required: true,
    })
    @IsNotEmpty()
    public readonly text: string;

    @ApiProperty({
      description: 'Student\'s id',
      example: '1',
      required: true,
    })
    @IsNotEmpty()
    public readonly studentId: string;
  }