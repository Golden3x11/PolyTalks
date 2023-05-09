import {forwardRef, Module} from '@nestjs/common';
import {LecturerService} from './lecturer.service';
import {LecturerController} from './lecturer.controller';
import {MongooseModule} from '@nestjs/mongoose';

import {CourseModule} from '../course/course.module';
import {Lecturer, LecturerSchema} from "./entities/lecturer.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Lecturer.name,
                schema: LecturerSchema,
            },
        ]),
        forwardRef(() => CourseModule), // <-- use forwardRef() here
    ],
    controllers: [LecturerController],
    providers: [LecturerService],
    exports: [LecturerService, MongooseModule],
})
export class LecturerModule {}
