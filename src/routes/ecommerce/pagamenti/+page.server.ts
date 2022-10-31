import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/** @type {import('./$types').Actions} */
export const actions = {
	compra: async ({ cookies, request }) => {
		const form_data = await request.formData();
		try {
			await prisma.ordini.create({
				data: {
					PK_Id: form_data.get('id'),
					Nome: form_data.get('nome'),
					Cognome: form_data.get('cognome'),
					Indirizzo: form_data.get('indirizzo'),
					FK_Email: form_data.get('email'),
					Cap: form_data.get('cap'),
					Domicilio: form_data.get('domicilio'),
					Totale: parseInt(form_data.get('totale')),
					Cart: form_data.get('cart'),
					Timestamp: form_data.get('timestamp')
				}
			});
			return { success: true };
		} catch (error) {
			console.error(error);
			return { success: false };
		}
	}
};
