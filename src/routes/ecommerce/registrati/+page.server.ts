import { PrismaClient } from '@prisma/client';
import * as CodiceFiscaleUtils from '@marketto/codice-fiscale-utils';
import md5 from "md5";
import emailjs from '@emailjs/browser';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	registrati: async ({ cookies, request }) => {
        emailjs.init('tfSXJVz0VLhWR2I_5');
		const form_data = await request.formData();

        const news_raw: string = form_data.get('news');
        const cf: string = form_data.get('cf');
        const privacy_raw: string = form_data.get('privacy');

        let news = false;
        if (news_raw != undefined) {
            news = true;
        }

        if (privacy_raw == undefined) {
            return { status: false, message: "è necessario accettare l'informativa sulla privacy per registrare un account"};
        }

        if(!CodiceFiscaleUtils.Validator.codiceFiscale(cf).valid){
            return { status: false, message: "codice fiscale non valido"};
        }

        try {
            await prisma.utente.create({
                data: {
                    PK_Email: form_data.get('email'),
                    Password: md5(form_data.get('password')),
                    News: news,
                    CF: cf,
                    Nascita: form_data.get('nascita'),
                    Telefono: form_data.get('telefono')
                }
            });
            return {success: true}
        } catch (error) {
            return {success: false, message: error}
        }

	}
};
