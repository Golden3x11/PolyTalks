import {Injectable} from '@nestjs/common';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor(private mailService: MailerService) {
    }


    async sendNewActivityMail(toEmail: string, thread: string) {
        const DEFAULT_TEXT: string = `Thread '${thread}' you subscribed have new activity`;

        return this.mailService.sendMail({
            to: toEmail,
            from: "nani.bommidi93@gmail.com",
            subject: 'PolyTalks <3',
            text: DEFAULT_TEXT,
        });
    }
}

