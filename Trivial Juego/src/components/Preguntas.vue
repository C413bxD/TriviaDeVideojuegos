<template>
  <div>
    <p class="row justify-end q-mt-sm q-mr-md">puntaje: 8pts</p>
    <q-page class="flex flex-center">
      <div>
        <q-linear-progress
          stripe
          rounded
          size="20px"
          :value="progreso"
          color="black"
          class="q-mt-sm"
        />
        <h3 class="text-center" text-color="black">
          ¿Pregunta {{ pregunta_actual.question }}?
        </h3>
        <div class="row justify-center">
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
    <pre>
      {{ preguntas }}
    </pre>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getPreguntas();
  },
  data() {
    return {
      total: 15,
      actual: 0,
      puntaje: 0,
      pregunta_actual: {},
      preguntas: [],
    };
  },
  methods: {
    async getPreguntas() {
      // const res=await axios.get("https://opentdb.com/api.php?amount=10&category=26")
      const res = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: this.total,
          category: this.$route.query.category,
          difficulty: this.$route.query.level,
          type: "multiple",
        },
      });
      this.preguntas = res.data.results.map((x) => {
        x.list = [...x.incorrect_answers, x.correct_answer];
        x.list.sort();
        return x;
      });
      this.pregunta_actual = this.preguntas[0];
      this.actual = 0;
    },
    validarRespuesta(answer) {
      console.log("voy a validar la respuesta ", answer);
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
