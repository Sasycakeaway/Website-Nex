import { PrismaClient } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { decrypt } from '$lib/crypto/aes';

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
		throw error(401, 'Non sei autorizzato ad accedere a questa pagina'); // L'utente non è autorizzato
	}
	return { Pk_Email: email, CF: decrypt(user.CF), Nascita: decrypt(user.Nascita), Telefono: decrypt(user.Telefono) };
};
