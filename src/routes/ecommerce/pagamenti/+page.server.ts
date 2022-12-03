import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from '$lib/crypto/aes';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	const email = cookies.get('email');

	if (session == null && email == null) {
		throw error(401, 'Non sei autorizzato ad accedere a questa pagina, per favore accedi con il tuo account'); // L'utente non è autorizzato
	}

	const user = await prisma.utente.findFirst({
		where: {
			PK_Email: email,
			Password: session
		}
	});
	if (user == undefined) {
		throw error(401, 'Non sei autorizzato ad accedere a questa pagina, per favore accedi con il tuo account'); // L'utente non è autorizzato
	}
	return { email: email };
};

/** @type {import('./$types').Actions} */
export const actions = {
	compra: async ({ cookies, request }) => {
		const form_data = await request.formData();
		const domicilio_raw: string = form_data.get('domicilio');
		let domicilio = false;
		if (domicilio_raw != undefined) {
			domicilio = true;
		}
		try {
			await prisma.ordini.create({
				data: {
					PK_Id: form_data.get('id'),
					Nome: encrypt(form_data.get('nome')),
					Cognome: encrypt(form_data.get('cognome')),
					Indirizzo: encrypt(form_data.get('indirizzo')),
					FK_Email: form_data.get('email'),
					Cap: encrypt(form_data.get('cap')),
					Domicilio: domicilio,
					Totale: parseInt(form_data.get('totale')),
					Cart: form_data.get('cart'),
					Timestamp: new Date()
				}
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
