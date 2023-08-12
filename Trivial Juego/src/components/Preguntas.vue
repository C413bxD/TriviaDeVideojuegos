<template>
  <div>
    <p class="row justify-end q-mt-sm q-mr-md">Username</p>

    <q-page class="flex flex-center">
      <q-linear-progress
          stripe
          rounded
          size="20px"

          :value="progreso"
          color="black"
          class="q-mt-sm"
          style="width: 70%;"
        />
      <div>
        <h6 class="text-center q-ma-xs text-blue-grey-13" text-color="black">
          Pregunta {{ pregunta_actual.category }}
        </h6>
        <h4 class="text-center" text-color="black">
          ¿Pregunta {{ pregunta_actual.question }}?
        </h4>
        <div class="row justify-center q-gutter-md">
          <q-btn
            v-for="answer in pregunta_actual.list"
            color="white"
            text-color="black"
            rounded
            :label="answer"
            :key="answer"
            @click="validarRespuesta(answer)"
          />
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getPreguntas();
  },
  //creamos una data con la cantidad de preguntas, en la pregunta que nos encontramos(actual), y su puntaje
  data() {
    return {
      total: 15,
      actual: 0,
      puntaje: 0,
      pregunta_actual: {},
      preguntas: [],
    };
  },
  //consumimos el api
  methods: {
    async getPreguntas() {
      const res = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: this.total,
          category: this.$route.query.category,
          difficulty: this.$route.query.level,
          type: "multiple",
        },
      });
      //mapeamos lo que optenemos del api y obtemos las respuestas correctas e incorrectas
      this.preguntas = res.data.results.map((x) => {
        x.list = [...x.incorrect_answers, x.correct_answer];
        x.list.sort();
        return x;
      });
      this.pregunta_actual = this.preguntas[0];
      this.actual = 0;
    },
    //funcion para validar las respuestas, si la respuesta es correcta aumentamos en 1, tambien avanzamos 1 pregunta hasta llegar al total y redirigimos a la otra vista
    validarRespuesta(answer) {
      if (answer == this.pregunta_actual.correct_answer) {
        this.puntaje++;
      }
      this.actual++;
      if (this.actual < this.total)
        this.pregunta_actual = this.preguntas[this.actual];
      else {
        this.$router.push({
          path: "/resultado",
          query: {
            score: this.puntaje,
          },
        });
      }
    },
  },
  computed:{
    progreso(){
      return this.actual/this.total
    }
  }
};
</script>
