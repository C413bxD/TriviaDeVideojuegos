<!-- mostramos el score que tuvo el jugador y usamos el href para compartir en twitter -->
<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row justify-center">
      <q-icon name="emoji_events" size="100px" />
      </div>
      <div class="row text-center">
        <h3>Felicitaciones hiciste {{ this.$route.query.score }} puntos</h3>
      </div>
      <div class="row justify-center q-gutter-md">
        <q-btn  color="black" label="Volver a jugar" to="/" />
        <q-btn  color="black" label="Compartir" href="https://twitter.com/intent/tweet" icon="share" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {

};
</script>
