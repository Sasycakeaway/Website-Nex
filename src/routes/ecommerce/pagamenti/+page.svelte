<script lang="ts">
	import { init } from '$lib/js/paypal';
	import { onMount } from 'svelte';
	import { GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps';
	import { json } from '@sveltejs/kit';
	//import google from 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBomQdV10KKTb45y-uIXWl-ZlFgyEOxcsc&libraries=places&callback=initMap'
	let nome: string,
		cognome: string,
		indirizzo: string,
		cap: string,
		domicilio = false,
		totale: string | null,
		cart: string | null,
		cittavar: string,
		email: string;

	/** @type {import('./$types').PageData} */
	export let data;

	onMount(async () => {
		email = data.email;
		totale = localStorage.getItem('totale');
		cart = localStorage.getItem('cart');
	});

	function pagamento() {
		if (nome != null && cognome != null && indirizzo != null && cap != null && cittavar != null) {
			indirizzo = cittavar + ',' + indirizzo;
			let json_cart;
			if(cart != null)
				json_cart = JSON.parse(cart);

			for(let i = 0; i < json_cart.length; i++) {
				json_cart[i].image = ""	// Sanitize the image property in DB
			}

			init(totale, nome, cognome, indirizzo, cap, domicilio, email, JSON.stringify(json_cart), cittavar);
			document.getElementById('conf').style.visibility = 'hidden';
		} else alert('Compila tutti i campi richiesti');
	}

	function citta(e) {
		cittavar = e.detail.place.formatted_address;
	}
</script>

<svelte:head>
	<script
		src="https://www.paypal.com/sdk/js?client-id=AXG9tYzRz10-7z2Hhro6tScAENTIHDtqWdFL9gqCx2hcH8-VqKG6gs1n3yMZzge6UvLVECsfdtezoLTk&currency=EUR"
		data-namespace="paypal_sdk"
	></script>
	<link rel="stylesheet" href="/css/pagamenti.css" />
</svelte:head>
<br />
<br />
<div align="center" class="form">
	<form class="uk-fieldset" method="POST" action="?/compra">
		<legend class="uk-legend">Modulo di pagamento</legend>

		<div class="uk-margin">
			<input class="uk-input" type="text" placeholder="Nome" name="nome" bind:value={nome}/>
			<br />
			<br />

			<input class="uk-input" type="text" placeholder="Cognome" name="cognome" bind:value={cognome}/>
			<br />
			<br />
			<GooglePlacesAutocomplete
				apiKey="AIzaSyCcnkrkY74xBbIDf4UZdYH4bZwXaSvh1nM"
				styleClass="uk-input"
				on:placeChanged={citta}
				placeholder="Città"
			/>
			<br />
			<br />
			<input
				class="uk-input"
				type="input"
				placeholder="Indirizzo di consegna"
				id="map"
				name="indirizzo"
				bind:value={indirizzo}
			/>
			<br />
			<br />
			<input class="uk-input" type="text" placeholder="CAP" name="cap" bind:value={cap}/>
			<br />
			<br />
			<input type="checkbox" id="domicilio" name="domicilio" bind:checked={domicilio}/>
			<label for="domicilio"
				>Consegna a domicilio o spedizione se l'indirizzo di consegna è fuori dal Piemonte</label
			>
			<br />
			<br />
		</div>
		<div align="center" />
	</form>
</div>
<div align="center" id="conf">
	<button class="uk-button uk-button-primary" on:click={pagamento}>Procedi al pagamento</button>
</div>

<div id="paypal" align="center" />
<br />
