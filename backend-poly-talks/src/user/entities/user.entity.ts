import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Thread } from 'src/thread/entities/thread.entity';

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    avatar: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }], default: []})
    subscribedThreads: Thread[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
