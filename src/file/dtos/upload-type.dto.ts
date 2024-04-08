import { ApiProperty } from "@nestjs/swagger";
import { UploadType } from "../enums";
import { IsEnum, IsOptional } from "class-validator";

export class UploadTypeDto {
    @ApiProperty({
        description: 'Upload type',
        example: UploadType.AVATAR,
        required: true,
        enum: Object.values(UploadType),
    })
    @IsOptional()
    @IsEnum(UploadType)
    uploadType: UploadType;
}