import {Module} from '@nestjs/common';
import {LecturerService} from './lecturer.service';
import {LecturerController} from './lecturer.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {LecturerSchema} from "./entities/lecturer/lecturer.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Lecturer', schema: LecturerSchema}])
    ],
    controllers: [LecturerController],
    providers: [LecturerService]
})
export class LecturerModule {
}
