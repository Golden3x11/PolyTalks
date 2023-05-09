import {Module} from '@nestjs/common';
import {ThreadService} from './thread.service';
import {ThreadController} from './thread.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Thread, ThreadSchema} from "./entities/thread.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Thread.name,
                schema: ThreadSchema,
            },
        ]),
    ],
    controllers: [ThreadController],
    providers: [ThreadService],
    exports: [ThreadService, MongooseModule],
})
export class ThreadModule {
}
