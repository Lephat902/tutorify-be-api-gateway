import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ResetPasswordRequestDto {
    @ApiProperty({
        description: 'User email',
        example: 'test@test.com',
        required: true,
    })
    @IsEmail()
    email: string;
}