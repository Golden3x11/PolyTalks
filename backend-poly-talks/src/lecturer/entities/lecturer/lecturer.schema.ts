import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Course} from "../../../course/entities/course.entity";
import {Rating} from "../rating/rating.model";

@Schema()
export class Lecturer {

    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    email: string;

    @Prop({ type: [{ type: String, ref: 'Course' }], default: [] })
    courses: Course['_id'][];

    @Prop({ type: [{ type: Object, ref: 'Rating' }], default: [] })
    ratings: Rating[];
}

export type LecturerDocument = Lecturer & Document;

export const LecturerSchema = SchemaFactory.createForClass(Lecturer);
