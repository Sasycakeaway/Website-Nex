import { dialogs } from 'svelte-dialogs';
import { v4 as uuidv4 } from 'uuid';
import emailjs from '@emailjs/browser';

function putorder(nome, cognome, indirizzo, cap, domicilio, email, cart, totale, cittavar) {
	let id = uuidv4();
	var myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

	var urlencoded = new URLSearchParams();
	console.log(totale);
	urlencoded.append('id', id);
	urlencoded.append('nome', nome);
	urlencoded.append('cognome', cognome);
	urlencoded.append('indirizzo', indirizzo + " " + cittavar);
	urlencoded.append('cap', cap);
	urlencoded.append('domicilio', domicilio);
	urlencoded.append('totale', totale);
	urlencoded.append('cart', cart);
	urlencoded.append('email', email);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
	};

	fetch('/ecommerce/pagamenti?/compra', requestOptions)
		.then((response) => response.json())
		.then(async (result) => {
			console.log(result)
			if (result.data.success == true) {
				try {
					await emailjs.send('service_ccwtjlr', 'template_cavi0no', {
						id: id,
						nome: nome,
						cognome: cognome,
						indirizzo: indirizzo,
						email: email
					});
					location.href = '/ecommerce/ordercomplete';
				} catch (error) {
					dialogs.alert(
						"Errore durante la registrazione dell'ordine, contattarci, fornendo i dettagli del pagamento per richiedere il rimborso"
					).then(() => location.href = "/");
					console.log(error);
				}
				sessionStorage.clear();
			}
		})
		.catch((err) => {
			dialogs.alert(
				"Errore durante la registrazione dell'ordine, contattarci, fornendo i dettagli del pagamento per richiedere il rimborso"
			);
			console.error(err);
		});
}
export async function init(totale, nome, cognome, indirizzo, cap, domicilio, email, cart, cittavar) {
	emailjs.init('XI3aGphpOi4C1--qr');
	console.log(totale);
	totale = 0.01
	try {
		await paypal_sdk
			.Buttons({
				createOrder: function (data, actions) {
					return actions.order.create({
						purchase_units: [
							{
								amount: {
									value: totale
								}
							}
						]
					});
				},
				onApprove: function (data, actions) {
					console.log('approve');
					return actions.order.capture().then(async function (details) {
						putorder(nome, cognome, indirizzo, cap, domicilio, email, cart, totale, cittavar);
					});
				},
				onError: function (err) {
					dialogs.alert(
						"Errore durante la registrazione dell'ordine, contattarci, fornendo i dettagli del pagamento per richiedere il rimborso"
					);
				}
			})
			.render('#paypal');
	} catch (error) {
		console.error('failed to render the PayPal Buttons', error);
		// location.href= "/ecommerce/pagamenti";
	}
}

// export function getvariable(username, password, ordinipass, ordineora) {
// 	user = username;
// 	password = pass;
// 	newordini = ordinipass;
// 	newordini.push(ordineora);
// }
