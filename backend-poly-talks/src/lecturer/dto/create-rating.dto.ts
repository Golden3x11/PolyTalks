import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateRatingDto {
    @IsNotEmpty()
    @IsString()
    author: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    rating_difficulty: number;

    @IsNotEmpty()
    @IsNumber()
    rating_knowledge: number;

    @IsNotEmpty()
    @IsNumber()
    rating_communication: number;

    @IsNotEmpty()
    @IsNumber()
    rating_friendliness: number;
}