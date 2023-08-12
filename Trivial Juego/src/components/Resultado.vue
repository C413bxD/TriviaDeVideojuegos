<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row justify-center">
      <q-icon name="emoji_events" size="100px" />
      </div>
      <div class="row">
        <h3>Felicitaciones hiciste x puntos</h3>
      </div>
      <div class="row justify-center q-gutter-md">
        <q-btn  color="black" label="Volver a jugar" to="/" />
        <q-btn  color="black" label="Compartir" @click="jugar()" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {

};
</script>
