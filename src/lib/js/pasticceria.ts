import { onMount } from 'svelte';
import { pusha, initcart } from './cart';
import { dialogs } from 'svelte-dialogs';
export function initpage() {
	onMount(() => {
		initcart();
		if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
		} else {
			const card = document.getElementById('card');
			if(card != null)
				card.style.width = '60%';
		}
	});
}

export function biscotti(e: string, image: string, price: number, alertstring: string) {
	dialogs.prompt(alertstring).then((output) => {
		try {
			pusha(e, output[0], price, image);
		} catch (error) {
			console.log(error);
		}
	});
}

export function pezzi(e: string) {
	dialogs.prompt('Quanti ' + e + ' vuoi ordinare?').then((output) => {
		try {
			pusha(e, output[0], 5);
		} catch (error) {
			console.error(error)
		}
	});
}

export function apebox(e: string) {
	dialogs.prompt('Quanti box vuoi ordinare?').then((output) => {
		try {
			switch (e) {
				case 'Benvenuti al nord':
					pusha(e, output[0], 12, "/images/Benvenuti al nord.jpg");
					break;
				case 'Il vegetariano':
					pusha(e, output[0], 12, "/images/Benvenuti al sud.jpg");
					break;
				case 'Il trasformista':
					pusha(e, output[0], 18, "/images/Il trasformista.jpg");
					break;
				default:
					pusha(e, output[0], 15, "/images/Il vegetariano.jpg");
					break;
			}
		} catch (error) {
			console.log(error);
		}
	});
}
