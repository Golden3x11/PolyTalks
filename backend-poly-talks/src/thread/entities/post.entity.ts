import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {User} from "../../user/entities/user.entity";

export let PostSchema;

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

    @Prop({ type: [], default: []})
    comments: Post[];
}

export type PostDocument = Post & Document;
PostSchema = SchemaFactory.createForClass(Post)