/** @type {import('./$types').LayoutLoad} */
export function load({ request }) {
	try {
		const url = request.url;
		const params = url.split('?')[1];
		const prod = params.split('=')[1];
		return { prod: prod };
	} catch (error) {
		console.error(error);
		return { prod: '' };
	}
}
