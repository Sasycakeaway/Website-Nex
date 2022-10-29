<script>
  import { onMount } from "svelte";
  import { dialogs } from "svelte-dialogs";

  /** @type {import('./$types').ActionData} */
	export let form;
  onMount(() => {
    if(form?.success && form != null){
      dialogs.alert("Richiesta cancellata correttamente").then(() => location.href = "/");
    }else if(form != null){
      dialogs.alert("Errore durante la cancellazione della richiesta");
    }
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      document.getElementById("form").classList =
        "uk-card uk-card-default uk-card-body uk-width-1-2@m formatel";
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="/css/login.css" />
</svelte:head>
<div
  class="uk-card uk-card-default uk-card-body uk-width-1-2@m forma"
  id="form"
>
  <form class="uk-fieldset" method="POST" action="?/delete">
    <div align="center">
      <legend class="uk-legend">Sasy's Cake Away login</legend>
    </div>
    <div class="uk-margin">
      <center>
        <p>Inserire il codice identificativo della richiesta da eliminare</p>
      </center>
      <input
        class="uk-input"
        type="text"
        placeholder="Codice identificativo"
        name="id"
      />
    </div>
    <div class="uk-margin">
      <center>
        <button class="uk-button uk-button-primary"
          >Cancella la richiesta</button
        >
      </center>
    </div>
  </form>
</div>
<br />
