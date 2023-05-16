import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    userToken: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    creationDate: string;
}