<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
			document.getElementById('cards').style.paddingRight = '30px';
		}
	});
</script>

<svelte:head />

<div class="uk-child-width-expand@s uk-text-center container" uk-grid id="cards">
	<div>
		<a href="/ecommerce/area/profilo">
			<div class="uk-card uk-card-default ">
				<div class="uk-card-header">
					<div class="uk-grid-small uk-flex-middle" uk-grid>
						<div class="uk-width-auto">
							<img src="/images/profile.png" width="64px" />
						</div>
						<div class="uk-width-expand">
							<h3 class="uk-card-title uk-margin-remove-bottom">Il tuo profilo</h3>
						</div>
					</div>
				</div>
				<div class="uk-card-body">
					<p>Visualizza e modifica le informazione del tuo profilo</p>
				</div>
			</div>
		</a>
	</div>

	<div>
		<a href="/ecommerce/area/ordini">
			<div class="uk-card uk-card-default ">
				<div class="uk-card-header">
					<div class="uk-grid-small uk-flex-middle" uk-grid>
						<div class="uk-width-auto">
							<img src="https://img.icons8.com/glyph-neue/64/000000/cardboard-box.png" />
						</div>
						<div class="uk-width-expand">
							<h3 class="uk-card-title uk-margin-remove-bottom">I tuoi ordini</h3>
						</div>
					</div>
				</div>
				<div class="uk-card-body">
					<p>Consulta lo storico degli ordini effettuati</p>
				</div>
			</div>
		</a>
	</div>
</div>
<center>
	<form method="POST" action="?/logout">
		<button class="uk-button uk-button-danger">Effettua il logout</button>
	</form>
</center>
<br />

<style>
	.container {
		margin: 20px;
	}
</style>
