import {Module} from '@nestjs/common';
import {ThreadService} from './thread.service';
import {ThreadController} from './thread.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Thread, ThreadSchema} from "./entities/thread.entity";
import {TagModule} from "../tag/tag.module";
import { MailService } from './mail/mail.service';
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Thread.name,
                schema: ThreadSchema,
            }
        ]),
        MailerModule.forRoot({
            transport: {
                host: 'example.com',
                auth: {
                    user: 'tubedzieorzel',
                    pass: 'maslo',
                },
            }
        }),
        TagModule
    ],
    controllers: [ThreadController],
    providers: [ThreadService, MailService],
    exports: [ThreadService, MongooseModule],
})
export class ThreadModule {
}
