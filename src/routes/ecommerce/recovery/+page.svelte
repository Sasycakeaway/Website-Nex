<script lang="ts">
	import { dialogs } from 'svelte-dialogs';
	import { onMount } from 'svelte';
	import emailjs from '@emailjs/browser';

	/** @type {import('./$types').ActionData} */
	export let form: Reset_Password;

	onMount(async() => {
		emailjs.init('tfSXJVz0VLhWR2I_5');
		try{
			if (form.success && form != null) {
				dialogs.alert(
					"Segui le istruzioni nella email per ripristinare la password"
				);
				await emailjs.send("service_s11ial4", "template_f3ea7rh", {
					uuid: form.id,
					email: form.email,
				});
			}	
		}catch{
			dialogs.alert("Richiesta già esistente o email non esistente");
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
	<form class="uk-fieldset" method="POST" action="?/change">
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
				<button class="uk-button uk-button-primary">Ripristina</button>
			</center>
		</div>
	</form>
</div>
<br />
