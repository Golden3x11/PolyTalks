import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type LecturerDocument = Lecturer & Document;

@Schema()
export class Lecturer {
    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    email: string;

    @Prop([{_id: false}])
    courses: { _id: string; name: string; major: string }[];

    @Prop([{_id: false}])
    ratings: {
        author: { username: string; _id: string };
        title: string;
        description: string;
        rating: {
            difficulty: number;
            knowledge: number;
            communication: number;
            friendliness: number;
        };
    }[];
}

export const LecturerSchema = SchemaFactory.createForClass(Lecturer);
