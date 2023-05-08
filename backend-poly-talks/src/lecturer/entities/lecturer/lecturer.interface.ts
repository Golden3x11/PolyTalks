import {Document} from 'mongoose';
import {Course} from "../../../course/entities/course.entity";
import {Rating} from "../rating/rating.model";

export interface ILecturer extends Document {
    _id: string;
    name: string;
    surname: string;
    email: string;
    courses: Course['_id'][];
    ratings: Rating[];
}