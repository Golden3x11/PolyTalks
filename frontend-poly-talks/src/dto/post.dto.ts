import {UserDto} from "./user.dto";


export interface PostDto{
    _id: string,
    content: string,
    creationDate: Date,
    comments: PostDto[],
    author: UserDto
}