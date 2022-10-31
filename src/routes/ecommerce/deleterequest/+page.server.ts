import { PrismaClient } from '@prisma/client';
import * as CodiceFiscaleUtils from '@marketto/codice-fiscale-utils';
import md5 from 'md5';
import emailjs from '@emailjs/browser';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ cookies, request }) => {
		const form_data = await request.formData();

		try {
			await prisma.recoveryPassword.delete({
				where: {
					UUID: form_data.get('id')
				}
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
