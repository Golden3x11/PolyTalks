export interface ThreadDto{
    _id: string,
    title: string,
    description: string,
    tags: string[],
    creationDate: Date,
    posts: [],
    subscribers: string[],
}