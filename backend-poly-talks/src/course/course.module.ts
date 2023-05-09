import {forwardRef, Module} from '@nestjs/common';
import {CourseService} from './course.service';
import {CourseController} from './course.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {Course, CourseSchema} from './entities/course.entity';
import {LecturerModule} from "../lecturer/lecturer.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema,
            },
        ]),
        forwardRef(() => LecturerModule)
    ],
    controllers: [CourseController],
    providers: [CourseService],
    exports: [CourseService, MongooseModule],
})
export class CourseModule {}


