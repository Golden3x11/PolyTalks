import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
    @Prop()
    id: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop([String])
    tags: string[];

    @Prop()
    creationDate: string;

    @Prop()
    author: { username: string; _id: string };

    @Prop([{_id: false}])
    posts: {
        author: { username: string; _id: string };
        content: string;
        creationDate: string;
        comments: string[];
    }[];

    @Prop([{_id: false}])
    subscribers: { email: string; id: string }[];
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
