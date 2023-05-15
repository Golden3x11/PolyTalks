import {RatingDto} from "./rating.dto";

export interface LecturerDto {
    _id: string;
    name: string;
    surname: string;
    email: string;
    courses: string[];
    ratings: RatingDto[];
}