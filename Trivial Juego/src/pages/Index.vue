<template>
  <q-page class="flex flex-center">
    <div>
      <h3>Trivia de videojuegos</h3>

    <q-select  outlined v-model="modelCategoria" :options="categoria" option-value="id" option-label="name" label="Seleccione la categoria " class="q-mb-md" />

    <q-select  outlined v-model="modelDificultad" :options="dificultad" label="Seleccone la dificultad"  class="q-mb-md" />
      <div class="row justify-center">
        <q-btn  color="black" label="Jugar" :disabled="!(modelCategoria && modelDificultad)" @click="jugar()" />
      </div>
    </div>

  </q-page>

</template>

<script>
import axios from 'axios';

export default {
  name: 'PageIndex',
  mounted(){
    this.getCategoria()
  },
  data () {
    return {
      modelCategoria: null,
      modelDificultad: null,
      categoria: [],
      dificultad: ["easy","medium","hard"]
    }
  },
  methods:{
    async getCategoria(){
      const res= await axios.get("https://opentdb.com/api_category.php")

      this.categoria = (res.data.trivia_categories)
    },
    jugar(){
      this.$router.push({
        path:"/jugar",
        query:{
          category: this.modelCategoria.id,
          level:this.modelDificultad,
        }
      })
    }
  }
}
</script>
<style>

</style>
