import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Patient } from '../patient/models/patient.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(user:Patient){
        const url = `${process.env.API_HOST}/api/patient/activate/${user.activation_link}`;

        await this.mailerService.sendMail({
            to:user.email,
            subject:"Welcome to skidkachi app!",
            template:"./confirmation",
            context:{
                name:user.full_name,
                url
            }
        })
    }
}
