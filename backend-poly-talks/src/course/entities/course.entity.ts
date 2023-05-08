import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Lecturer} from "../../lecturer/entities/lecturer/lecturer.schema";
import {User} from "../../user/entities/user.entity";


export type CourseDocument = Course & Document;

export type Attachment = {
    _id: string;
    filename: string;
    uploadTime: string;
    value: string;
    description: string;
    tags: string[];
    author: User['_id'];
};

@Schema()
export class Course {

    @Prop()
    _id: string;

    @Prop({required: true, unique: true})
    code: string;

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop({required: true})
    major: string;

    @Prop({type: [{type: String, ref: 'Lecturer'}], default: []})
    lecturers: Lecturer['_id'][];

    @Prop({type: [{type: Object, ref: 'Attachment'}], default: []})
    attachments: Attachment[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);

