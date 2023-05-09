import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {User} from "../../user/entities/user.entity";

@Schema()
export class Post {

    @Prop({type: mongoose.Schema.Types.ObjectId, auto: true})
    _id: mongoose.Types.ObjectId;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: null})
    author: User['_id'];

    @Prop()
    content: string;

    @Prop()
    creationDate: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}], default: []})
    comments: Post['_id'][];
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);