import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Course, CourseDocument} from './entities/course.entity';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {Attachment} from "./entities/attachment.entity";
import {CreateAttachmentDto} from "./dto/crate-attachment.dto";

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private courseModel: Model<CourseDocument>
    ) {
    }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const createdCourse = new this.courseModel(createCourseDto);
        //toDo check if lecturer exists
        return createdCourse.save();
    }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find().populate('lecturers').exec();
    }

    async findById(id: string): Promise<Course> {
        const course = await this.courseModel
            .findById(id)
            .populate('lecturers')
            .exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.courseModel.findById(id).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        //toDo check if lecturers exists
        const { attachments = [], lecturers = [], ...updates } = updateCourseDto;
        const updatedCourse = {
            ...course.toObject(),
            ...updates,
            attachments: [...course.attachments, ...attachments],
            lecturers: [...course.lecturers, ...lecturers],
        };
        return this.courseModel.findByIdAndUpdate(id, updatedCourse, { new: true }).exec();
    }

    async delete(id: string): Promise<Course> {
        const course = await this.courseModel.findByIdAndDelete(id).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    async addAttachment(courseId: string, attachment: CreateAttachmentDto): Promise<Course> {
        const course = await this.courseModel.findById(courseId).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        course.attachments.push(attachment);
        return course.save();
    }

    async addLecturer(courseId: string, lecturerId: string): Promise<Course> {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        //toDo check if lecturer exists
        course.lecturers.push(lecturerId);
        return course.save();
    }

    async removeLecturer(courseId: string, lecturerId: string): Promise<Course> {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
        const lecturerIndex = course.lecturers.indexOf(lecturerId);
        if (lecturerIndex === -1) {
            throw new Error('Lecturer not found in the course');
        }
        course.lecturers.splice(lecturerIndex, 1);
        return course.save();
    }
}
