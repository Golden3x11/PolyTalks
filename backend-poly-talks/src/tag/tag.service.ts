import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTagDto} from './dto/create-tag.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Tag, TagDocument} from "./entities/tag.entity";

@Injectable()
export class TagService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {
    }

    create(createTagDto: CreateTagDto) {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
    }

    findAll(): Promise<Tag[]> {
        return this.tagModel.find().exec();
    }

    findById(id: string): Promise<Tag> {
        const tag = this.tagModel.findById(id).exec();
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }

    delete(id: string) {
        const tag = this.tagModel.findByIdAndDelete(id).exec();
        if (!tag) {
            throw new NotFoundException(`Tag with ID ${id} not found`);
        }
        return tag;
    }
}
