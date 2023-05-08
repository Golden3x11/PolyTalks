import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { User } from '../../../user/entities/user.entity';

export class CreateRatingDto {
    @IsNotEmpty()
    author: User['_id'];

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    difficulty: number;

    @IsNotEmpty()
    @IsNumber()
    knowledge: number;

    @IsNotEmpty()
    @IsNumber()
    communication: number;

    @IsNotEmpty()
    @IsNumber()
    friendliness: number;
}