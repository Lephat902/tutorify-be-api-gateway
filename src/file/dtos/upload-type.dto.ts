import { ApiProperty } from "@nestjs/swagger";
import { UploadType } from "../enums";
import { IsEnum, ValidateIf } from "class-validator";

export class UploadTypeDto {
    @ApiProperty({
        description: 'Upload type',
        example: UploadType.AVATAR,
        required: true,
        enum: Object.values(UploadType),
    })
    @ValidateIf((_object, value) => value)
    @IsEnum(UploadType)
    uploadType: UploadType;
}