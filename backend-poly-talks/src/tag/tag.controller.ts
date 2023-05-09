import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {TagService} from './tag.service';
import {CreateTagDto} from './dto/create-tag.dto';

@Controller('api/tag')
export class TagController {
    constructor(private readonly tagService: TagService) {
    }

    @Post()
    create(@Body() createTagDto: CreateTagDto) {
        return this.tagService.create(createTagDto);
    }

    @Get()
    findAll() {
        return this.tagService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tagService.delete(id);
    }
}
