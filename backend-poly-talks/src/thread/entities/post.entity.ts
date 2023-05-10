import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {User} from "../../user/entities/user.entity";

export let PostSchema;

@Schema({ _id: false })
export class Post {

    @Prop({required: true})
    _id: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: null})
    author: User['_id'];

    @Prop()
    content: string;

    @Prop()
    creationDate: string;

    @Prop({ type: [PostSchema], default: [] })
    comments: Post[];
}

export type PostDocument = Post & Document;
PostSchema = SchemaFactory.createForClass(Post)