import {User} from "../../user/entities/user.entity";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";
import {Course} from "../../course/entities/course.entity";

@Schema()
export class Rating {

    @Prop({type: mongoose.Schema.Types.ObjectId, auto: true})
    _id: mongoose.Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null})
    author: User;

    @Prop({default: new Date()})
    creationDate: Date;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null})
    course: Course;

    @Prop()
    rating_difficulty: number;

    @Prop()
    rating_knowledge: number;

    @Prop()
    rating_communication: number;

    @Prop()
    rating_friendliness: number;
}

export type RatingDocument = Rating & Document;
export const RatingSchema = SchemaFactory.createForClass(Rating);