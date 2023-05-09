import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {LecturerService} from './lecturer.service';
import {CreateLecturerDto} from './dto/create-lecturer.dto';
import {UpdateLecturerDto} from './dto/update-lecturer.dto';
import {CreateRatingDto} from './dto/create-rating.dto';
import {UpdateRatingDto} from "./dto/update-rating.dto";
import {Lecturer} from "./entities/lecturer.entity";

@Controller('api/lecturer')
export class LecturerController {
    constructor(private readonly lecturerService: LecturerService) {
    }

    @Post()
    async create(@Body() createLecturerDto: CreateLecturerDto) {
        return this.lecturerService.create(createLecturerDto);
    }

    @Get()
    async findAll() {
        return this.lecturerService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.lecturerService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateLecturerDto: UpdateLecturerDto) {
        return this.lecturerService.update(id, updateLecturerDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.lecturerService.delete(id);
    }

    @Post(':id/ratings')
    async addRating(@Param('id') id: string, @Body() rating: CreateRatingDto) {
        return this.lecturerService.addRating(id, rating);
    }

    @Delete(':id/ratings/:ratingId')
    async deleteRating(@Param('id') id: string, @Param('ratingId') ratingId: string) {
        return this.lecturerService.deleteRating(id, ratingId);
    }

    @Put('/lecturers/:id/ratings/:ratingId')
    async updateLecturerRating(@Param('id') id: string, @Param('ratingId') ratingId: string, @Body() updateRatingDto: UpdateRatingDto): Promise<Lecturer> {
        const lecturer = await this.lecturerService.updateRating(id, ratingId, updateRatingDto);
        if (!lecturer) {
            throw new NotFoundException('Lecturer not found');
        }
        return lecturer;
    }

    @Post(':id/courses/:courseId')
    async addCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
        return this.lecturerService.addCourse(id, courseId);
    }

    @Delete(':id/courses/:courseId')
    async removeCourse(@Param('id') id: string, @Param('courseId') courseId: string) {
        return this.lecturerService.removeCourse(id, courseId);
    }
}