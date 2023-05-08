import {ArrayNotEmpty, IsArray, IsNotEmpty, IsString} from "class-validator";

export class CreateAttachmentDto {
    @IsNotEmpty()
    @IsString()
    filename: string;

    @IsNotEmpty()
    @IsString()
    uploadTime: string;

    @IsNotEmpty()
    @IsString()
    value: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    tags: string[];
}