import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Course, CourseSchema} from "../../course/entities/course.entity";
import {Rating, RatingSchema} from "./rating.entity";

export interface Lecturer {
    _id: string;
    name: string;
    surname: string;
    email: string;
    courses: Course['_id'][];
    ratings: Rating[];
}

@Schema()
export class Lecturer {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    surname: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}], default: []})
    courses: Course['_id'][];

    @Prop({type: [RatingSchema], default: []})
    ratings: Rating[];
}

export type LecturerDocument = Lecturer & Document;
export const LecturerSchema = SchemaFactory.createForClass(Lecturer);
