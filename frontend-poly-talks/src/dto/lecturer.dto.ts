import {RatingDto} from "./rating.dto";
import {CourseDto} from "./course.dto";

export interface LecturerDto {
    _id: string;
    name: string;
    surname: string;
    email: string;
    courses: CourseDto[];
    ratings: RatingDto[];
}