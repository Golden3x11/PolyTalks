import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res} from '@nestjs/common';
import {LecturerService} from './lecturer.service';
import {CreateLecturerDto} from './dto/create-lecturer.dto';
import {UpdateLecturerDto} from './dto/update-lecturer.dto';

@Controller('lecturer')
export class LecturerController {
    constructor(private readonly lecturerService: LecturerService) {
    }

    @Post()
    async create(@Res() response, @Body() createLecturerDto: CreateLecturerDto) {
        try {
            const newLecturer = await this.lecturerService.create(createLecturerDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Lecturer has been created successfully',
                newLecturer,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Lecturer not created!',
                error: 'Bad Request'
            });
        }
    }

    @Get()
    async getAll(@Res() response) {
        try {
            const lecturerData = await this.lecturerService.getAll();
            return response.status(HttpStatus.OK).json({
                message: 'All Lecturers data found successfully', lecturerData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getById(@Res() response, @Param('id') id: string) {
        try {
            const existingLecturer = await this.lecturerService.findById(id);
            return response.status(HttpStatus.OK).json({
                message: 'Lecturer found successfully', existingLecturer,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Patch('/:id')
    async update(@Res() response, @Param('id') id: string, @Body() updateLecturerDto: UpdateLecturerDto) {
        try {
            const existingLecturer = await this.lecturerService.update(id, updateLecturerDto);
            return response.status(HttpStatus.OK).json({
                message: 'Lecturer has been successfully updated',
                existingLecturer,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async delete(@Res() response, @Param('id') id: string) {
        try {
            const deletedLecturer = await this.lecturerService.delete(id);
            return response.status(HttpStatus.OK).json({
                message: 'Lecturer deleted successfully',
                deletedLecturer,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
