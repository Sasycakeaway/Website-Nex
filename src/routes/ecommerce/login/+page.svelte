<script>
	import { onMount } from 'svelte';
	import md5 from 'md5';
	const ENDPOINT = '/api/login';
	import { dialogs } from 'svelte-dialogs';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons/index.js';
	var user;
	var pass;
	let show = false;

	/** @type {import('./$types').ActionData} */
	export let form;

	onMount(() => {
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		) {
			document.getElementById('form').classList =
				'uk-card uk-card-default uk-card-body uk-width-1-2@m formatel';
		}
		if (form != null && form.success == false) {
			dialogs.alert('Login fallito, ' + form?.message);
		}
	});

	function showfn() {
		show = !show;
		if (show) {
			document.getElementById('pass').type = 'text';
		} else {
			document.getElementById('pass').type = 'password';
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/login.css" />
</svelte:head>
<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m forma" id="form">
	<form class="uk-fieldset" method="POST" action="?/login">
		<div align="center">
			<legend class="uk-legend">Sasy's Cake Away login</legend>
		</div>
		<div class="uk-margin">
			<input class="uk-input" type="text" placeholder="Email" name="email" />
		</div>
		<div class="uk-margin">
			<input class="uk-input" type="password" placeholder="Password" name="pass" id="pass" />
			<button class="uk-form-icon uk-form-icon-flip icon" on:click={showfn} type="button">
				{#if show == false}
					<Fa icon={faEye} />
				{:else}
					<Fa icon={faEyeSlash} />
				{/if}
			</button>
		</div>
		<div class="uk-margin">
			<center>
				<a href="/ecommerce/recovery">Ho dimenticato la password</a>
			</center>
		</div>
		<div class="uk-child-width-expand@s uk-text-center" uk-grid>
			<div>
				<button class="uk-button uk-button-primary">Accedi</button>
			</div>
			<div>
				<a href="/ecommerce/registrati"
					><button class="uk-button uk-button-primary" type="button" href="/ecommerce/registrati"
						>Registrati</button
					></a
				>
			</div>
		</div>
	</form>
</div>
<br />

<style>
	.icon {
		margin-right: 10px;
		margin-top: 10px;
		background-color: transparent;
		border: 0px;
	}
</style>
