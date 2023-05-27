import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import mongoose, {Model} from 'mongoose';
import {Course, CourseDocument} from './entities/course.entity';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {CreateAttachmentDto} from "./dto/crate-attachment.dto";
import {Lecturer, LecturerDocument} from "../lecturer/entities/lecturer.entity";
import {Attachment} from "./entities/attachment.entity";

@Injectable()
export class CourseService {
    constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>,
                @InjectModel(Course.name) private courseModel: Model<CourseDocument>) {
    }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const existingLecturerIds = await this.lecturerModel
            .find({_id: {$in: createCourseDto.lecturers}})
            .distinct('_id')
            .exec();

        if (createCourseDto.lecturers && existingLecturerIds.length !== createCourseDto.lecturers.length) {
            throw new BadRequestException(
                'One or more lecturers specified in the create request do not exist',
            );
        }
        const {attachments, ...course} = createCourseDto;

        return this.courseModel.create(course);
    }

    async findAll(): Promise<Course[]> {
        return this.courseModel
            .find()
            .populate('lecturers')
            .select('-attachments')
            .exec();
    }

    async findById(id: string): Promise<Course> {
        const course = await this.courseModel
            .findById(id)
            .populate('lecturers')
            .select('-attachments')
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

        if (updateCourseDto.lecturers && existingLecturerIds.length !== updateCourseDto.lecturers.length) {
            throw new BadRequestException('One or more courses specified in the update do not exist');
        }

        const {attachments = [], lecturers = [], ...updates} = updateCourseDto;
        const updatedCourse = {
            ...course.toObject(),
            ...updates,
            lecturers: [...course.lecturers, ...lecturers],
        };
        return this.courseModel
            .findByIdAndUpdate(id, updatedCourse, {new: true})
            .select('-attachments')
            .exec();
    }

    async delete(id: string): Promise<Course> {
        const course = await this.courseModel
            .findByIdAndDelete(id)
            .select('-attachments')
            .exec();

        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    async getAttachments(courseId: string): Promise<Attachment[]> {
        const course = await this.courseModel.findById(courseId).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }


        const courseV = await this.courseModel
            .findById(courseId)
            .select('-attachments.value')
            .exec();

        const sortedAttachments = courseV.attachments.sort((a, b) => {
            if (a.uploadTime < b.uploadTime) {
                return 1;
            } else if (a.uploadTime > b.uploadTime) {
                return -1;
            } else {
                return 0;
            }
        });

        return sortedAttachments;
    }

    async addAttachment(courseId: string, attachment: CreateAttachmentDto): Promise<Course> {
        const course = await this.courseModel.findById(courseId).exec();
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        course.attachments.push({
            _id: new mongoose.Types.ObjectId().toHexString(),
            ...attachment
        });


        await course.save();

        return this.courseModel
            .findById(courseId)
            .populate('lecturers')
            .select('-attachments')
            .exec();
    }

    async addLecturer(lecturerId: string, courseId: string): Promise<Course> {
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

        return this.courseModel
            .findById(courseId)
            .populate('lecturers')
            .select('-attachments')
            .exec();
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

        return this.courseModel
            .findById(courseId)
            .populate('lecturers')
            .select('-attachments')
            .exec();
    }

    async downloadValue(courseId: string, attachmentId: string): Promise<{}> {
        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }

        const attachment = course.attachments.find(a => a._id === attachmentId);
        if (!attachment) {
            throw new NotFoundException(`Attachment with ID ${attachmentId} not found`);
        }

        return {
            name: attachment.filename,
            value: attachment.value
        };
    }
}
