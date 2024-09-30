<script setup>
import { onBeforeMount, ref } from 'vue'
import { getPreguntes } from './comsManager'

const llistaPreguntes = ref([]);


    onBeforeMount(async () => {
    const preguntes = await getPreguntes();
    console.log(preguntes);
      preguntes.forEach(element => {
        llistaPreguntes.value.push(element);
      });
    });




</script>

<template>
  <html>
    <head>
        <title>Adminisrador del Qüestionari</title>
    </head>
    <body>
        <div>
            <h1 class="titol">Administrador del Qüestionari</h1>
        </div>
        <div v-for="pregunta in llistaPreguntes" :key="pregunta.id" class="graella">
            <div class="item1"><h2>{{ pregunta.pregunta }}</h2></div>
            <div class="item2"><p>Aquí va la imatge</p></div>
            <div class="item3"><p>{{ pregunta.respostes[0].etiqueta }}</p></div>
            <div class="item4"><p>{{ pregunta.respostes[1].etiqueta }}</p></div>
            <div class="item5"><p>{{ pregunta.respostes[2].etiqueta }}</p></div>
            <div class="item6"><p>{{ pregunta.respostes[3].etiqueta }}</p></div>
            <div class="item7"><p>{{ pregunta.resposta_correcta }}</p></div>
            <div class="boto1"><button>Update</button></div>
            <div class="boto2"><button>Delete</button></div>
        </div>
    </body>
  </html>
</template>

<style>
  .graella {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 3fr;
  }

  .item1 {
      grid-row: 1;
      grid-column: 2 / 4;
      text-align: center;
  }

  .item2 {
      grid-row: 2;
      grid-column: 2 / 4;
      text-align: center;
  }

  .item3 {
      grid-row: 3;
      grid-column: 1 / 3;
      text-align: center;
  }

  .item4 {
      grid-row: 4;
      grid-column: 1 / 3;
      text-align: center;
  }

  .item5 {
      grid-row: 3;
      grid-column: 3 / 5;
      text-align: center;
  }

  .item6 {
      grid-row: 4;
      grid-column: 3 / 5;
      text-align: center;
  }

  .item7 {
      grid-row: 5;
      grid-column: 2 / 4;
      text-align: center;
  }

  .boto1 {
      grid-row: 6;
      grid-column: 2;
      text-align: center;
  }

  .boto2 {
      grid-row: 6;
      grid-column: 3;
      text-align: center;
  }

  .titol {
      text-align: center;
  }
</style>

