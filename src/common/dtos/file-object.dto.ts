import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class FileObject {
    @ApiProperty({
        description: 'Id of the file',
        example: '123',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
        description: 'URL of the file',
        example: 'https://www.youtube.com/watch?v=CSvFpBOe8eY',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    readonly url: string;

    @ApiProperty({
        description: 'Title of file',
        example: 'Chop suey',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty({
        description: 'Size of file in Bytes',
        example: '123456',
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly size: number;
};