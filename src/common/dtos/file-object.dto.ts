import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FileObject {
    @ApiProperty({
        description: 'Id of the file',
        example: '123',
        required: true,
    })
    @IsOptional()
    @IsString()
    readonly id: string;

    @ApiProperty({
        description: 'URL of the file',
        example: 'https://www.youtube.com/watch?v=CSvFpBOe8eY',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly url: string;

    @ApiProperty({
        description: 'Title of file',
        example: 'Chop suey',
        required: true,
    })
    @IsOptional()
    @IsString()
    readonly title: string;

    @ApiProperty({
        description: 'Size of file in Bytes',
        example: '123456',
        required: true,
    })
    @IsOptional()
    @IsNumber()
    readonly size: number;
};
