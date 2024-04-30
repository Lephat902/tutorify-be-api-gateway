import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ResetPasswordDto {
    @ApiProperty({
        description: 'User password',
        example: 'password',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;

    @ApiProperty({
        description: 'Reset password token',
        example: '123',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    token: string;
}