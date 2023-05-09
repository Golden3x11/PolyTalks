import {IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreatePostDto} from "./create-post.dto";

export class CreateThreadDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsArray()
    tags: string[];

    @IsOptional()
    @IsString()
    creationDate: string;

    @IsNotEmpty()
    author: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostDto)
    posts: CreatePostDto[];

    @IsArray()
    subscribers: string[];
}