import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class SubjectDto {
    @ApiProperty({
      description: "Subject's ID",
      example: '02f1815b-3da9-45d9-9aba-7a2f87cef7d7',
      required: false,
    })
    @IsUUID()
    public readonly id: string;
  
    @ApiProperty({
      description: 'Name of the subject',
      example: "Math",
      required: true,
    })
    @IsNotEmpty()
    public readonly name: string;
  }