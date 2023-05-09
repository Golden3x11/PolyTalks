import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Post, PostSchema} from "./post.entity";
import {User} from "../../user/entities/user.entity";
import {Tag} from "../../tag/entities/tag.entity";

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}], default: []})
    tags: Tag[];

    @Prop()
    creationDate: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: null})
    author: User['_id'];

    @Prop({type: [PostSchema], default: []})
    posts: Post[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []})
    subscribers: User['_id'][];
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
