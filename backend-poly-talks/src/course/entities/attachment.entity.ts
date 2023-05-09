import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";

@Schema({ _id: false })
export class Attachment {

    @Prop({required: true})
    _id: string;

    @Prop({required: true})
    filename: string;

    @Prop({required: true})
    uploadTime: string;

    @Prop({required: true})
    value: string;

    @Prop({required: true})
    description: string;

    @Prop({type: [String], required: true})
    tags: string[];
}

export type AttachmentDocument = Attachment & Document;
export const AttachmentSchema = SchemaFactory.createForClass(Attachment);