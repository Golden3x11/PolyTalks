import {IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {ObjectId, Types} from 'mongoose';
import {CreateRatingDto} from "../rating/create-rating.dto";

const ObjectId = Types.ObjectId;

export class CreateLecturerDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => ObjectId)
    courses: ObjectId[];

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => CreateRatingDto)
    ratings: CreateRatingDto[];
}
