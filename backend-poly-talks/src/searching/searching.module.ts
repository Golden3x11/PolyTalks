import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {LecturerModule} from "../lecturer/lecturer.module";
import { Lecturer, LecturerSchema } from '../lecturer/entities/lecturer.entity';
import { Thread, ThreadSchema } from '../thread/entities/thread.entity';
import { Course, CourseSchema } from '../course/entities/course.entity';
import { Tag, TagSchema } from '../tag/entities/tag.entity';
import { SearchingController } from './searching.controller';
import { SearchingService } from './searching.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema,
            },
            {
                name: Lecturer.name,
                schema: LecturerSchema
            },
            {
                name: Thread.name,
                schema: ThreadSchema
            },
            {
                name: Tag.name,
                schema: TagSchema
            }
        ])
    ],
    controllers: [SearchingController],
    providers: [SearchingService],
    exports: [],
})
export class SearchingModule {}


