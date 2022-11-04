<script lang="ts">
	import { onMount } from 'svelte';

	let email: String, cf: String, nascita: String, telefono: String;

	/** @type {import('./$types').PageData} */
	export let data: User;

	onMount(async () => {
		email = data.PK_Email;
		cf = data.CF;
		nascita = data.Nascita;
		telefono = data.Telefono;
	});
</script>

<div class="container">
	<fieldset class="uk-fieldset field">
		<center>
			<br />
			<legend class="uk-legend">Il mio profilo</legend>
		</center>
		<div class="uk-margin">
			<p>E-Mail</p>
			<input class="uk-input" type="text" placeholder="E-mail" readonly bind:value={email} />
		</div>

		<div class="uk-margin">
			<p>Numero di telefono</p>
			<input
				class="uk-input"
				type="text"
				placeholder="Numero di telefono"
				readonly
				bind:value={telefono}
			/>
		</div>

		<div class="uk-margin">
			<p>Codice Fiscale</p>
			<input class="uk-input" type="text" placeholder="Codice Fiscale" readonly bind:value={cf} />
		</div>

		<div class="uk-margin">
			<p>Data di nascita</p>
			<input
				class="uk-input"
				type="date"
				placeholder="Data di nascita"
				readonly
				bind:value={nascita}
			/>
		</div>
		<!-- <div class="uk-margin">
            <p>Scrivi la password per confermare le modifiche</p>
            <input class="uk-input" type="text" placeholder="Password" readonly bind:value={pass}>
        </div> -->
		<!-- <center>
            <button class="uk-button uk-button-primary" on:click={update}>Aggiorna i dati</button>
            <hr/>
        </center> -->
	</fieldset>
</div>

<style>
	.container {
		margin: 20px;
		background-color: white;
		border-radius: 8px;
	}
	hr {
		opacity: 0;
	}
	.field {
		margin: 20px;
	}
</style>
