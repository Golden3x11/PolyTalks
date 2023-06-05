import {UserDto} from "./user.dto";

export interface RatingDto {
    author: UserDto;
    title: string;
    description: string;
    course: string;
    rating_difficulty: number;
    rating_knowledge: number;
    rating_communication: number;
    rating_friendliness: number;
    creationDate: Date;
}