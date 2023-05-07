import {Module} from '@nestjs/common';
import {LecturerService} from './lecturer.service';
import {LecturerController} from './lecturer.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Lecturer, LecturerSchema} from "./entities/lecturer.entity";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Lecturer.name, schema: LecturerSchema}])
    ],
    controllers: [LecturerController],
    providers: [LecturerService]
})
export class LecturerModule {
}
