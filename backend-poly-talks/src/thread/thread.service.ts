import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateThreadDto} from './dto/create-thread.dto';
import {UpdateThreadDto} from './dto/update-thread.dto';
import {Thread, ThreadDocument} from "./entities/thread.entity";
import {InjectModel} from "@nestjs/mongoose";
import mongoose, {Model} from "mongoose";
import {Tag, TagDocument} from "../tag/entities/tag.entity";
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Injectable()
export class ThreadService {
    constructor(@InjectModel(Thread.name) private threadModel: Model<ThreadDocument>,
                // @InjectModel(Tag.name) private tagModel: Model<TagDocument>
                ) {
    }

    async create(createThreadDto: CreateThreadDto): Promise<Thread> {
        const createdThread = new this.threadModel(createThreadDto);

        // const existingTagIds = await this.tagModel
        //     .find({_id: {$in: createdThread.tags}})
        //     .distinct('_id')
        //     .exec();
        //
        // if (existingTagIds.length !== createdThread.tags.length) {
        //     throw new BadRequestException(
        //         'One or more tags specified in the create request do not exist',
        //     );
        // }

        return createdThread.save();
    }

    async findAll(): Promise<Thread[]> {
        return this.threadModel.find().populate('tags').populate('author').exec();
    }

    async findById(id: string): Promise<Thread> {
        const thread = await this.threadModel.findById(id).populate('tags').populate('author').exec();
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

        // const existingTagIds = await this.tagModel
        //     .find({_id: {$in: updateThreadDto.tags}})
        //     .distinct('_id')
        //     .exec();

        // if (existingTagIds.length !== updateThreadDto.tags.length) {
        //     throw new BadRequestException('One or more tags specified in the create request do not exist');
        // }

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
        const thread = await this.threadModel.findById(threadId);
        if (!thread) {
            throw new NotFoundException(`Thread with ID ${threadId} not found`);
        }

        const post = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            ...createPostDto
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

        if (updatePostDto.creationDate) {
            post.creationDate = updatePostDto.creationDate;
        }

        await thread.save();
        return thread;
    }
}
