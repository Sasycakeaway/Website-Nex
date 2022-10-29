<script>
	import { dialogs } from "svelte-dialogs";
	import emailjs from '@emailjs/browser';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons/index.js';

	/** @type {import('./$types').ActionData} */
	export let form;

	let buttonpress = false;
	var show = false,
		showcheck = false,
		privacy = false;

	onMount(() => {
    if(form?.success && form != null){
		emailjs.init('tfSXJVz0VLhWR2I_5');
		emailjs.send("service_s11ial4", "template_4x1knko", {
            email: form.email,
            newsremove: form.newsremove,
        }).then(() => dialogs.alert("Account registrato correttamente").then(() => location.href = "/ecommerce/login"));
    }else if(form != null){
      dialogs.alert("Errore durante la creazione dell'account, " + form.message);
    }
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		) {
			document.getElementById('form').classList =
				'uk-card uk-card-default uk-card-body uk-width-1-2@m formatel';
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
	function showfncheck() {
		showcheck = !showcheck;
		if (showcheck) {
			document.getElementById('passcheck').type = 'text';
		} else {
			document.getElementById('passcheck').type = 'password';
		}
	}
</script>

<svelte:head>
	<link rel="stylesheet" href="/css/login.css" />
</svelte:head>
<br />
<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m forma" id="form">
	<form class="uk-fieldset" method="POST" action="?/registrati">
		<div align="center">
			<legend class="uk-legend">Registra un account su Sasy's Cake Away</legend>
		</div>
		<div class="uk-margin">
			<input id="username" class="uk-input" type="text" placeholder="E-mail" name="email" />
		</div>
		<div class="uk-margin">
			<input
				id="pass"
				class="uk-input"
				type="password"
				placeholder="Password"
				name="password"
			/>
			<button class="icon" type="button" on:click={showfn}>
				{#if show == false}
					<Fa icon={faEye} />
				{:else}
					<Fa icon={faEyeSlash} />
				{/if}
			</button>
		</div>
		<div class="uk-margin">
			<input
				id="passcheck"
				class="uk-input"
				type="password"
				placeholder="Conferma la Password"
				name="passwordcheck"
			/>
			<button class="icon" type="button" on:click={showfncheck}>
				{#if showcheck == false}
					<Fa icon={faEye} />
				{:else}
					<Fa icon={faEyeSlash} />
				{/if}
			</button>
		</div>
		<div class="uk-margin">
			<input
				id="telefono"
				class="uk-input"
				type="text"
				placeholder="Numero di telefono"
				name="telefono"
			/>
		</div>
		<div class="uk-margin">
			<input
				id="nascita"
				class="uk-input"
				type="date"
				placeholder="Data di nascita"
				name="nascita"
			/>
		</div>
		<div class="uk-margin">
			<input id="cf" class="uk-input" type="text" placeholder="Codice fiscale" name="cf" />
		</div>
		<div class="d-flex justify-content-center">
			<div class="form-check ">
				<input
					class="form-check-input"
					type="checkbox"
					id="flexCheckDefault"
					name="news"
				/>
				<label class="form-check-label" for="flexCheckDefault">
					Vuoi ricevere comunicazioni di carattere pubblicitario sulla email che hai indicato nel
					form?
				</label>
			</div>
		</div>
		<br />
		<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
			<label
				><input type="checkbox" name="privacy"/> Accetto l'<a
					href="/Sasy - Privacy - 2022.pdf">informativa sulla privacy</a
				> di Sasy's Cake Away</label
			>
		</div>
		<div align="center">
			<div>
					<button class="uk-button uk-button-primary">Registrati</button>
					<br />
					<br />
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
	.iconcheck {
		margin-top: 100px;
	}
</style>
