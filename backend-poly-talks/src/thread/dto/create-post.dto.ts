import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    creationDate: string;
}