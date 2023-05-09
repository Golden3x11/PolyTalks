import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateLecturerDto} from './dto/create-lecturer.dto';
import {UpdateLecturerDto} from './dto/update-lecturer.dto';
import {Lecturer, LecturerDocument} from "./entities/lecturer.entity";
import {InjectModel} from "@nestjs/mongoose";
import type {UpdateQuery} from 'mongoose';
import mongoose, {Model} from "mongoose";
import {CreateRatingDto} from "./dto/create-rating.dto";
import {Course, CourseDocument} from "../course/entities/course.entity";
import {UpdateRatingDto} from "./dto/update-rating.dto";

@Injectable()
export class LecturerService {
    constructor(@InjectModel(Lecturer.name) private lecturerModel: Model<LecturerDocument>,
                @InjectModel(Course.name) private courseModel: Model<CourseDocument>) {
    }

    async create(createLecturerDto: CreateLecturerDto): Promise<Lecturer> {
        const lecturer = new this.lecturerModel(createLecturerDto);

        const existingCourseIds = await this.courseModel
            .find({_id: {$in: lecturer.courses}})
            .distinct('_id')
            .exec();

        if (existingCourseIds.length !== lecturer.courses.length) {
            throw new BadRequestException(
                'One or more courses specified in the create request do not exist',
            );
        }

        return lecturer.save();
    }

    async findAll(): Promise<Lecturer[]> {
        return this.lecturerModel.find().populate('courses').exec();
    }

    async findById(id: string): Promise<Lecturer> {
        const lecturer = await this.lecturerModel
            .findById(id)
            .populate('courses')
            .exec();
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with ID ${id} not found`);
        }
        return lecturer;
    }

    async update(id: string, updateLecturerDto: UpdateLecturerDto): Promise<Lecturer> {
        const lecturer = await this.lecturerModel.findById(id).exec();
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with ID ${id} not found`);
        }

        // Check if the courses specified in updateLecturerDto exist
        const existingCourseIds = await this.courseModel.find({
            _id: {$in: updateLecturerDto.courses}
        }).distinct('_id');

        if (existingCourseIds.length !== updateLecturerDto.courses.length) {
            throw new BadRequestException('One or more courses specified in the update do not exist');
        }

        const {ratings = [], courses = [], ...updates} = updateLecturerDto;
        const updatedLecturer = {
            ...lecturer.toObject(),
            ...updates,
            ratings: [...lecturer.ratings, ...ratings],
            courses: [...lecturer.courses, ...courses],
        };

        return this.lecturerModel.findByIdAndUpdate(id, updatedLecturer, {new: true}).exec();
    }


    async delete(id: string): Promise<Lecturer> {
        const deletedLecturer = await this.lecturerModel.findByIdAndDelete(id);
        if (!deletedLecturer) {
            throw new NotFoundException(`Lecturer #${id} not found`);
        }
        return deletedLecturer;
    }

    async addRating(lecturerId: string, createRatingDto: CreateRatingDto): Promise<Lecturer> {
        const lecturer = await this.lecturerModel.findById(lecturerId).exec();
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with ID ${lecturerId} not found`);
        }

        lecturer.ratings.push({_id: new mongoose.Types.ObjectId(), ...createRatingDto});
        return lecturer.save();
    }

    async deleteRating(lecturerId: string, ratingId: string) {
        const result: UpdateQuery<LecturerDocument> = await this.lecturerModel.updateOne(
            {_id: lecturerId},
            {$pull: {ratings: {_id: ratingId}}}
        );
        if (result.nModified === 0) {
            throw new NotFoundException(`Rating with id ${ratingId} not found for lecturer with id ${lecturerId}`);
        }
    }

    async updateRating(lecturerId: string, ratingId: string, updateRatingDto: UpdateRatingDto): Promise<Lecturer> {
        const lecturer = await this.lecturerModel.findById(lecturerId).exec();

        if (!lecturer) {
            throw new NotFoundException(`Lecturer with id ${lecturerId} not found`);
        }

        const ratingIndex = lecturer.ratings.findIndex(
            (rating) => rating._id.toString() === ratingId,
        );
        if (ratingIndex === -1) {
            throw new Error(`Rating with id ${ratingId} not found for lecturer`);
        }

        const rating = lecturer.ratings[ratingIndex];

        if (!rating) {
            throw new NotFoundException(`Rating with id ${ratingId} not found`);
        }

        if (updateRatingDto.author) {
            rating.author = updateRatingDto.author;
        }

        if (updateRatingDto.title) {
            rating.title = updateRatingDto.title;
        }

        if (updateRatingDto.description) {
            rating.description = updateRatingDto.description;
        }

        if (updateRatingDto.rating_difficulty) {
            rating.rating_difficulty = updateRatingDto.rating_difficulty;
        }

        if (updateRatingDto.rating_knowledge) {
            rating.rating_knowledge = updateRatingDto.rating_knowledge;
        }

        if (updateRatingDto.rating_communication) {
            rating.rating_communication = updateRatingDto.rating_communication;
        }

        if (updateRatingDto.rating_friendliness) {
            rating.rating_friendliness = updateRatingDto.rating_friendliness;
        }

        return await lecturer.save();
    }


    async addCourse(lecturerId: string, courseId: string) {
        const lecturer = await this.lecturerModel.findById(lecturerId);
        if (!lecturer) {
            throw new NotFoundException(`Lecturer with id ${lecturerId} not found`);
        }

        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new NotFoundException(`Course with id ${courseId} not found`);
        }

        if (lecturer.courses.some((c) => c.toString() === courseId)) {
            throw new Error(`Lecturer with id ${lecturerId} already teaches course with id ${courseId}`);
        }

        lecturer.courses.push(courseId);
        await lecturer.save();

        course.lecturers.push(lecturerId);
        await course.save();
    }

    async removeCourse(lecturerId: string, courseId: string): Promise<Lecturer> {
        const lecturer = await this.lecturerModel.findById(lecturerId);
        if (!lecturer) {
            throw new Error(`Lecturer with ID ${lecturerId} not found`);
        }

        const courseIndex = lecturer.courses.indexOf(courseId);
        if (courseIndex === -1) {
            throw new Error(`Course with ID ${courseId} not found for lecturer with ID ${lecturerId}`);
        }

        lecturer.courses.splice(courseIndex, 1);
        await lecturer.save();

        const course = await this.courseModel.findById(courseId);
        if (!course) {
            throw new Error(`Course with ID ${courseId} not found`);
        }

        const lecturerIndex = course.lecturers.indexOf(lecturerId);
        if (lecturerIndex === -1) {
            throw new Error(`Lecturer with ID ${lecturerId} not found for course with ID ${courseId}`);
        }

        course.lecturers.splice(lecturerIndex, 1);
        await course.save();

        return lecturer;
    }
}
