import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

class CourseDto {
    @ApiProperty()
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    major: string;
}

class RatingDto {
    @ApiProperty()
    @IsNotEmpty()
    author: { username: string; _id: string };

    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    difficulty: number;

    @ApiProperty()
    @IsNotEmpty()
    knowledge: number;

    @ApiProperty()
    @IsNotEmpty()
    communication: number;

    @ApiProperty()
    @IsNotEmpty()
    friendliness: number;
}

export class CreateLecturerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    surname: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({type: [CourseDto]})
    @ValidateNested({each: true})
    @Type(() => CourseDto)
    courses: CourseDto[];

    @ApiProperty({type: [RatingDto]})
    @ValidateNested({each: true})
    @Type(() => RatingDto)
    ratings: RatingDto[];
}
