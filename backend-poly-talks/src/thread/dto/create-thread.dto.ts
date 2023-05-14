import {IsArray, IsDate, IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
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
    @IsDate()
    creationDate: Date;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostDto)
    posts: CreatePostDto[];

    @IsArray()
    subscribers: string[];
}