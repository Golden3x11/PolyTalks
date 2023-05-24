import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Post, PostSchema} from "./post.entity";
import {User, UserSchema} from "../../user/entities/user.entity";
import {Tag} from "../../tag/entities/tag.entity";

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread extends Document{
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({default: []})
    tags: string[];

    @Prop({ default: new Date() })
    creationDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    author: User;

    @Prop({type: [PostSchema], default: []})
    posts: Post[];

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []})
    subscribers: User[];
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);