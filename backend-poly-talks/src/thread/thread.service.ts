import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateThreadDto} from './dto/create-thread.dto';
import {UpdateThreadDto} from './dto/update-thread.dto';
import {Thread, ThreadDocument} from "./entities/thread.entity";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Tag, TagDocument} from "../tag/entities/tag.entity";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
                @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
                private readonly userService: UserService) {
    }

    async create(createThreadDto: CreateThreadDto): Promise<Thread> {
        const {userToken, ...course} = createThreadDto;
        const createdThread = new this.threadModel(course);

        createdThread.author = await this.userService.findOne({token: userToken})

        const existingTags = await this.tagModel
            .find({name: {$in: createThreadDto.tags}})
            .exec();

        if (createdThread.tags && existingTags.length !== createdThread.tags.length) {
            throw new BadRequestException(
                'One or more tags specified in the create request do not exist',
            );
        }

        return createdThread.save();
    }

    async findAll(): Promise<Thread[]> {
        return this.threadModel.find().populate('tags').populate('author').exec();
    }

    async findById(id: string): Promise<Thread> {
        const thread = await this.threadModel.findById(id)
            .populate('tags')
            .populate('author')
            .populate('posts.author')
            .exec();
        if (!thread) {
            throw new NotFoundException(`Thread with ID ${id} not found`);
        }
        return thread;
    }

    async update(id: string, updateThreadDto: UpdateThreadDto): Promise<Thread> {
        const thread = await this.threadModel.findById(id).populate('tags').populate('author').exec();
        if (!thread) {
            throw new NotFoundException(`Thread with ID ${id} not found`);
        }

        const existingTags = await this.tagModel
            .find({name: {$in: updateThreadDto.tags}})
            .exec();

        if (updateThreadDto.tags && existingTags.length !== updateThreadDto.tags.length) {
            throw new BadRequestException('One or more tags specified in the create request do not exist');
        }

        const {tags = [], subscribers = [], ...updates} = updateThreadDto;
        const updatedThread = {
            ...thread.toObject(),
            ...updates,
            tags: [...thread.tags, ...tags],
            subscribers: [...thread.subscribers, ...subscribers],
        };

        return this.threadModel.findByIdAndUpdate(id, updatedThread, {new: true}).exec();
    }

    async delete(id: string): Promise<Thread> {
        const deletedThread = await this.threadModel.findByIdAndDelete(id);
        if (!deletedThread) {
            throw new NotFoundException(`Thread #${id} not found`);
        }
        return deletedThread;
    }

    async addPostToThread(threadId: string, createPostDto: CreatePostDto): Promise<Thread> {
        const {userToken, ...createPost} = createPostDto;

        const thread = await this.threadModel.findById(threadId);
        if (!thread) {
            throw new NotFoundException(`Thread with ID ${threadId} not found`);
        }

        const post = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            ...createPost,
            author: await this.userService.findOne({token: userToken}),
            comments: [],
            creationDate: new Date()
        };

        thread.posts.push(post);
        await thread.save();
        return thread;
    }

    async deletePostFromThread(threadId: string, postId: string): Promise<Thread> {
        const thread = await this.threadModel.findById(threadId).exec();
        if (!thread) {
            throw new NotFoundException(`Thread with ID ${threadId} not found`);
        }
        const postIndex = thread.posts.findIndex(post => post._id.toString() === postId);
        if (postIndex === -1) {
            throw new NotFoundException(`Post with ID ${postId} not found in thread`);
        }
        thread.posts.splice(postIndex, 1);
        return thread.save();
    }

    async updatePost(threadId: string, postId: string, updatePostDto: UpdatePostDto): Promise<Thread> {
        const thread = await this.threadModel.findById(threadId);
        if (!thread) {
            throw new NotFoundException(`Thread with id ${threadId} not found`);
        }

        const postIndex = thread.posts.findIndex(
            (post) => post._id.toString() === postId,
        );
        if (postIndex === -1) {
            throw new Error(`Post with id ${postId} not found for thread`);
        }

        const post = thread.posts[postIndex];
        if (!post) {
            throw new NotFoundException(`Post with id ${postId} not found`);
        }

        if (updatePostDto.content) {
            post.content = updatePostDto.content;
        }

        await thread.save();
        return thread;
    }

    async addCommentToPost(threadId: string, postId: string, createPostDto: CreatePostDto): Promise<Thread>{
        const thread = await this.threadModel.findById(threadId);
        if (!thread) {
            throw new NotFoundException(`Thread with id ${threadId} not found`);
        }
        const {userToken, ...createPost} = createPostDto;

        const post = thread.posts.find(post  => post._id.toString() === postId);
        if (!post) {
            throw new Error(`Post with id ${postId} not found for thread`);
        }

        const comment = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            ...createPost,
            author: await this.userService.findOne({token: userToken}),
            comments: [],
            creationDate: new Date()
        };

        post.comments.push(comment)

        return  thread.save()
    }
}
