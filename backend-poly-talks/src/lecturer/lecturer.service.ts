import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateLecturerDto} from './dto/create-lecturer.dto';
import {UpdateLecturerDto} from './dto/update-lecturer.dto';
import {Lecturer} from "./entities/lecturer.entity";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class LecturerService {
    constructor(@InjectModel('Lecturer') private lecturerModel: Model<Lecturer>) {
    }

    async create(createLecturerDto: CreateLecturerDto): Promise<Lecturer> {
        const newLecturer = await new this.lecturerModel(createLecturerDto);
        return newLecturer.save();
    }

    async getAll(): Promise<Lecturer[]> {
        const lecturerData = await this.lecturerModel.find();
        if (!lecturerData || lecturerData.length == 0) {
            throw new NotFoundException('Students data not found!');
        }
        return lecturerData;
    }

    async findById(id: string): Promise<Lecturer> {
        const existingLecturer = await this.lecturerModel.findById(id).exec();
        if (!existingLecturer) {
            throw new NotFoundException(`Lecturer #${id} not found`);
        }
        return existingLecturer;
    }

    async update(id: string, updateLecturerDto: UpdateLecturerDto): Promise<Lecturer> {
        const existingLecturer = await this.lecturerModel.findByIdAndUpdate(id, updateLecturerDto, {new: true});
        if (!existingLecturer) {
            throw new NotFoundException(`Lecturer #${id} not found`);
        }
        return existingLecturer;
    }

    async delete(id: string): Promise<Lecturer> {
        const deletedLecturer = await this.lecturerModel.findByIdAndDelete(id);
        if (!deletedLecturer) {
            throw new NotFoundException(`Lecturer #${id} not found`);
        }
        return deletedLecturer;
    }
}
