<script lang="ts">
	import { Circle3 } from 'svelte-loading-spinners';
	import { onMount } from 'svelte';

	let loading = true,
		ordini: Array<Ordini> = [];
	/** @type {import('./$types').PageData} */
	export let data: DataOrder;
	onMount(async () => {
		ordini = data.ordini;
		loading = !loading;
	});
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<br />
{#if loading == false}
	<div class="container">
		<ul uk-accordion>
			{#each ordini as order}
				<li class="order">
					<a class="uk-accordion-title" href="#">Ordine numero: {order.PK_Id}</a>
					<div class="uk-accordion-content">
						<p>Nome: {order.Nome}</p>
						<p>Cognome: {order.Cognome}</p>
						<p>Indirizzo: {order.Indirizzo}</p>
						<p>CAP: {order.Cap}</p>
						<p>Consegna a domicilio: {order.Domicilio}</p>
						<p>Totale: {order.Totale}</p>
						<p>Data dell'ordine: {order.Timestamp.toString().split('T')[0]}</p>
						<p>Prodotti acquistati</p>
						<ul>
							{#each JSON.parse(order.Cart) as cart}
								<li>{capitalizeFirstLetter(cart.id)} - Quantità {cart.qty}</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{:else}
	<center>
		<Circle3 size="128" unit="px" duration="2s" />
	</center>
{/if}

<style>
	.order {
		/* background-color: white; */
	}
	.container {
		margin: 20px;
	}
</style>
