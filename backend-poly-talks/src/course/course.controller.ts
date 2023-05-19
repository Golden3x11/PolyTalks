import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CourseService} from './course.service';
import {UpdateCourseDto} from './dto/update-course.dto';
import {Course} from "./entities/course.entity";
import {CreateCourseDto} from "./dto/create-course.dto";
import {CreateAttachmentDto} from "./dto/crate-attachment.dto";
import {Attachment} from "./entities/attachment.entity";

@Controller('api/course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Get()
    async findAll(): Promise<Course[]> {
        return this.courseService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Course> {
        return this.courseService.findById(id);
    }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.courseService.create(createCourseDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Course> {
        return this.courseService.delete(id);
    }

    @Get(':id/attachments')
    async getAttachment(@Param('id') courseId: string): Promise<Attachment[]> {
        return this.courseService.getAttachments(courseId);
    }

    @Post(':id/attachments')
    async addAttachment(@Param('id') courseId: string, @Body() attachment: CreateAttachmentDto): Promise<Course> {
        return this.courseService.addAttachment(courseId, attachment);
    }

    @Post(':id/lecturers')
    async addLecturer(@Param('id') courseId: string, @Body() body: { lecturerId: string }) {
        return this.courseService.addLecturer(courseId, body.lecturerId);
    }

    @Delete(':id/lecturers')
    async removeLecturer(@Param('id') courseId: string, @Body() body: { lecturerId: string }): Promise<Course> {
        return this.courseService.removeLecturer(courseId, body.lecturerId);
    }

    @Get(':id/attachment/:aId')
    async downloadValue(@Param('id') id: string, @Param('aId') aId: string): Promise<{}> {
        return this.courseService.downloadValue(id, aId);
    }
}
