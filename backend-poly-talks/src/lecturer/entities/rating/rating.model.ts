import {User} from "../../../user/entities/user.entity";

export type Rating = {
    author: User['_id'];
    title: string;
    description: string;
    rating: {
        difficulty: number;
        knowledge: number;
        communication: number;
        friendliness: number;
    };
};