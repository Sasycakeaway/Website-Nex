import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('session');
	const email = cookies.get('email');

	if (session == null && email == null) {
		return;
	}

	const user = await prisma.utente.findFirst({
		where: {
			PK_Email: email,
			Password: session
		}
	});

	if (user == null) {
		throw error(401, 'Non sei autorizzato ad accedere a questa pagina, per favore accedi con il tuo account'); // L'utente non è autorizzato
	}

	const orders = await prisma.ordini.findMany({
		where: {
			FK_Email: email
		}
	});

	return { ordini: orders };
};
