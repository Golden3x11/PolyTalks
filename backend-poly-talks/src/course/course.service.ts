import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Course, CourseDocument} from './entities/course.entity';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {CreateAttachmentDto} from "./dto/crate-attachment.dto";
import {Lecturer, LecturerDocument} from "../lecturer/entities/lecturer.entity";

@Injectable()
export class CourseService {
    constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>,
                @InjectModel(Course.name) private courseModel: Model<CourseDocument>) {
    }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const createdCourse = new this.courseModel(createCourseDto);

        const existingLecturerIds = await this.lecturerModel
            .find({_id: {$in: createdCourse.lecturers}})
            .distinct('_id')
            .exec();

        if (existingLecturerIds.length !== createdCourse.lecturers.length) {
            throw new BadRequestException(
                'One or more lecturers specified in the create request do not exist',
            );
        }

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

        // Check if the courses specified in updateLecturerDto exist
        const existingLecturerIds = await this.lecturerModel.find({
            _id: {$in: updateCourseDto.lecturers}
        }).distinct('_id');

        if (existingLecturerIds.length !== updateCourseDto.lecturers.length) {
            throw new BadRequestException('One or more courses specified in the update do not exist');
        }

        const {attachments = [], lecturers = [], ...updates} = updateCourseDto;
        const updatedCourse = {
            ...course.toObject(),
            ...updates,
            attachments: [...course.attachments, ...attachments],
            lecturers: [...course.lecturers, ...lecturers],
        };
        return this.courseModel.findByIdAndUpdate(id, updatedCourse, {new: true}).exec();
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

    async addLecturer(lecturerId: string, courseId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with id ${courseId} not found`);
        }

        const lecturer = await this.lecturerModel.findById(lecturerId);
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with id ${lecturerId} not found`);
        }

        if (course.lecturers.some((l) => l.toString() === lecturerId)) {
            throw new Error(`Course with id ${courseId} already is led by lecturer with id ${lecturerId}`);
        }

        course.lecturers.push(lecturerId);
        await course.save();

        lecturer.courses.push(courseId);
        await lecturer.save();
    }

    async removeLecturer(courseId: string, lecturerId: string): Promise<Course> {
        // Find the course by ID
        const course = await this.courseModel.findById(courseId).populate('lecturers').exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        // Find the lecturer by ID
        const lecturer = await this.lecturerModel.findById(lecturerId).populate('courses').exec();
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with ID ${lecturerId} not found`);
        }

        // Remove the lecturer from the course's list of lecturers
        const lecturerIndex = course.lecturers.indexOf(lecturerId);
        if (lecturerIndex === -1) {
            throw new NotFoundException(`Lecturer with ID ${lecturerId} not found in course with ID ${courseId}`);
        }
        course.lecturers.splice(lecturerIndex, 1);

        // Remove the course from the lecturer's list of courses
        const courseIndex = lecturer.courses.indexOf(courseId);
        if (courseIndex === -1) {
            throw new NotFoundException(`Course with ID ${courseId} not found in lecturer with ID ${lecturerId}`);
        }
        lecturer.courses.splice(courseIndex, 1);

        // Save the updated course and lecturer
        await course.save();
        await lecturer.save();

        return course;
    }
}
