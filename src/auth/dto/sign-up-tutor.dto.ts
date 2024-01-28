import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
import { SignUpDto } from "./sign-up-base-user.dto";

export class SignUpTutorDto extends SignUpDto {
    @ApiProperty({
      description: 'Biography of the tutor',
      example: 'I am a passionate educator with 10 years of experience...',
      required: false,
    })
    @IsString()
    public readonly biography: string;
  
    @ApiProperty({
      description: 'Minimum wage expected by the tutor',
      example: '3.000.000 VND',
      required: false,
    })
    @IsString()
    public readonly minimumWage: string;
  
    @ApiProperty({
      description: 'Current workplace of the tutor',
      example: 'ABC Academy',
      required: false,
    })
    @IsString()
    public readonly currentWorkplace: string;
  
    @ApiProperty({
      description: 'Current position of the tutor',
      example: 'Mathematics Teacher',
      required: false,
    })
    @IsString()
    public readonly currentPosition: string;
  
    @ApiProperty({
      description: 'Major of the tutor',
      example: 'Computer Science',
      required: false,
    })
    @IsString()
    public readonly major: string;
  
    @ApiProperty({
      description: 'Graduation year of the tutor',
      example: 2010,
      required: false,
      type: 'integer',
    })
    @IsInt()
    public readonly graduationYear: number;
  }