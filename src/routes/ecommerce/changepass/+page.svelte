<script>
	import { onMount } from 'svelte';
	import { dialogs } from 'svelte-dialogs';

	/** @type {import('./$types').ActionData} */
	export let form;
	onMount(() => {
		if (form?.success && form != null) {
			dialogs
				.alert('Password cambiata correttamente')
				.then(() => (location.href = '/ecommerce/login'));
		} else if (form != null) {
			dialogs.alert("Errore durante la creazione dell'account, " + form.message);
		}
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		) {
			document.getElementById('form').classList =
				'uk-card uk-card-default uk-card-body uk-width-1-2@m formatel';
		}
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/login.css" />
</svelte:head>
<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m forma" id="form">
	<fieldset class="uk-fieldset">
		<div align="center">
			<legend class="uk-legend">Sasy's Cake Away login</legend>
		</div>
		<div class="uk-margin">
			<center>
				<p>Inserire la Email per la quale si vuole ripristinare la password</p>
			</center>
			<input class="uk-input" type="text" placeholder="Username" name="email" />
		</div>
		<div class="uk-margin">
			<center>
				<p>Inserire la nuova password</p>
			</center>
			<input class="uk-input" type="password" placeholder="Password" name="pass" />
		</div>
		<div class="uk-margin">
			<center>
				<p>Inserire nuovamente la password</p>
			</center>
			<input class="uk-input" type="password" placeholder="Password" name="passcheck" />
		</div>
		<div class="uk-margin">
			<center>
				<p>Inserire il codice identificativo arrivato via email</p>
			</center>
			<input class="uk-input" type="text" placeholder="Codice identificativo" name="uuid" />
		</div>
		<div class="uk-margin">
			<center>
				<button class="uk-button uk-button-primary">Ripristina</button>
			</center>
		</div>
	</fieldset>
</div>
<br />
