import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  major: string;

  @Prop([{ _id: false }])
  lecturers: { _id: string; name: string; surname: string }[];

  @Prop([{ _id: false }])
  attachments: {
    _id: string;
    filename: string;
    uploadTime: string;
    value: string;
    description: string;
    tags: string[];
    author: { username: string; _id: string };
  }[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
