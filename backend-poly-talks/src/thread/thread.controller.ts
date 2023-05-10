import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ThreadService} from './thread.service';
import {CreateThreadDto} from './dto/create-thread.dto';
import {UpdateThreadDto} from './dto/update-thread.dto';
import {CreatePostDto} from "./dto/create-post.dto";
import {Thread} from "./entities/thread.entity";
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller('thread')
export class ThreadController {
    constructor(private readonly threadService: ThreadService) {
    }

    @Post()
    create(@Body() createThreadDto: CreateThreadDto) {
        return this.threadService.create(createThreadDto);
    }

    @Get()
    findAll() {
        return this.threadService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.threadService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
        return this.threadService.update(id, updateThreadDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.threadService.delete(id);
    }

    @Post(':threadId/posts')
    async addPostToThread(@Param('threadId') threadId: string, @Body() createPostDto: CreatePostDto,): Promise<Thread> {
        return this.threadService.addPostToThread(threadId, createPostDto);
    }

    @Delete(':threadId/posts/:postId')
    async deletePostFromThread(@Param('threadId') threadId: string, @Param('postId') postId: string,): Promise<Thread> {
        return this.threadService.deletePostFromThread(threadId, postId);
    }

    @Patch(':threadId/posts/:postId')
    async updatePost(@Param('threadId') threadId: string, @Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto,): Promise<Thread> {
        return this.threadService.updatePost(threadId, postId, updatePostDto);
    }

    @Post(':threadId/posts/:postId')
    async addCommentToPost(@Param('threadId') threadId: string, @Param('postId') postId: string, @Body() createPostDto: CreatePostDto,): Promise<Thread> {
        return this.threadService.addCommentToPost(threadId, postId, createPostDto);
    }
}
