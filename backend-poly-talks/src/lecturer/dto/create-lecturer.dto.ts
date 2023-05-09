import {IsArray, IsEmail, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {CreateRatingDto} from "./create-rating.dto";

export class CreateLecturerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsEmail()
    email: string;

    @IsArray()
    courses: string[];

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateRatingDto)
    ratings: CreateRatingDto[];
}
