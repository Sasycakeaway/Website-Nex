import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

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
		throw redirect(401, '/ecommerce/login'); // L'utente non è autorizzato
	}

	const orders = await prisma.ordini.findMany({
		where: {
			FK_Email: email
		}
	});

	return { ordini: orders };
};
