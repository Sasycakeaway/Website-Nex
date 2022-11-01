import { PrismaClient } from '@prisma/client';
import * as CodiceFiscaleUtils from '@marketto/codice-fiscale-utils';
import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '$lib/crypto/aes';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	change: async ({ cookies, request }) => {
        try {
            cookies.set('email', null, {
                // send cookie for every page
                path: '/',
                // server side only cookie so you can't use `document.cookie`
                httpOnly: true,
                // only requests from same site can send cookies
                // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
                sameSite: 'strict',
                // only sent over HTTPS in production
                secure: process.env.NODE_ENV === 'production',
                // set cookie to expire after a month
                maxAge: 60 * 60 * 24 * 30
            });
            cookies.set('session', null, {
                // send cookie for every page
                path: '/',
                // server side only cookie so you can't use `document.cookie`
                httpOnly: true,
                // only requests from same site can send cookies
                // https://developer.mozilla.org/en-US/docs/Glossary/CSRF
                sameSite: 'strict',
                // only sent over HTTPS in production
                secure: process.env.NODE_ENV === 'production',
                // set cookie to expire after a month
                maxAge: 60 * 60 * 24 * 30
            });

            const form_data = await request.formData();
            const email = form_data.get("email");
            const id = uuidv4();
    
            await prisma.recoveryPassword.create({
                data: {
                    FK_Email: email,
                    UUID: id
                }
            });
            
            return { success: true, email: email, id: id };
        } catch (error) {
            console.error(error);
        }

	}
};
