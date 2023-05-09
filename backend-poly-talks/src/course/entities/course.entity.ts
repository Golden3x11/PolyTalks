import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Lecturer} from "../../lecturer/entities/lecturer.entity";
import {Attachment, AttachmentSchema} from "./attachment.entity";


export interface Course {
    _id: string;
    code: string;
    name: string;
    description: string;
    major: string;
    lecturers: Lecturer['_id'][];
    attachments: Attachment[];
}


@Schema()
export class Course {
    @Prop({required: true, unique: true})
    code: string;

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop({required: true})
    major: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer'}], default: []})
    lecturers: Lecturer['_id'][];

    @Prop({type: [AttachmentSchema], default: []})
    attachments: Attachment[];
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);

