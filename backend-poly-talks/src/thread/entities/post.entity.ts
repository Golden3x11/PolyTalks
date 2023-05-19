import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {User} from "../../user/entities/user.entity";

export let PostSchema;

@Schema({ _id: false })
export class Comment {
    @Prop({required: true})
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    author: User;

    @Prop({ default: new Date() })
    creationDate: Date;

    @Prop()
    content: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);


@Schema({ _id: false })
export class Post {

    @Prop({required: true})
    _id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    author: User;

    @Prop()
    content: string;

    @Prop({ default: new Date() })
    creationDate: Date;

    @Prop({ type: [CommentSchema], default: [] })
    comments: Comment[];
}

export type PostDocument = Post & Document;
PostSchema = SchemaFactory.createForClass(Post)