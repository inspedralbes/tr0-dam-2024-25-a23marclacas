<script setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { getPreguntes, postPregunta } from './comsManager'

const llistaPreguntes = ref([]);
const mostrarFormulari = ref(false);
var novaPregunta = reactive({
    id: '',
    pregunta: "",
    respostes: [
        {
          id: 1,
          etiqueta: ""
        },
        {
          id: 2,
          etiqueta: ""
        },
        {
          id: 3,
          etiqueta: ""
        },
        {
          id: 4,
          etiqueta: ""
        }
    ],
    resposta_correcta: 0,
    imatge: ""
});

onBeforeMount(async () => {
const preguntes = await getPreguntes();
console.log(preguntes);
    preguntes.forEach(element => {
        llistaPreguntes.value.push(element);
    });
});

function afegirPregunta() {
    postPregunta(novaPregunta);
    llistaPreguntes.value.push(novaPregunta);
    novaPregunta = reactive({
        id: '',
    pregunta: '',
    respostes: [
        {
          id: 1,
          etiqueta: ''
        },
        {
          id: 2,
          etiqueta: ''
        },
        {
          id: 3,
          etiqueta: ''
        },
        {
          id: 4,
          etiqueta: ''
        }
    ],
    resposta_correcta: 0,
    imatge: ''
    })
};
</script>

<template>
    <body>
        <div class="container">
            <div class="preguntes">
            <h1 class="titol">Administrador del Qüestionari</h1>
            <div class="botoAfegir">
                <button class="a" @click="mostrarFormulari = !mostrarFormulari">
                {{ mostrarFormulari ? 'Cancel·lar' : 'Afegir Pregunta' }}
                </button>
            </div>

            <div v-for="pregunta in llistaPreguntes" :key="pregunta.id" class="graella">
                <div class="item"><h2>{{ pregunta.pregunta }}</h2></div>
                <div class="item"><p>Aquí va la imatge</p></div>
                <div class="item"><p>a&#41; {{ pregunta.respostes[0].etiqueta }}</p></div>
                <div class="item"><p>b&#41; {{ pregunta.respostes[1].etiqueta }}</p></div>
                <div class="item"><p>c&#41; {{ pregunta.respostes[2].etiqueta }}</p></div>
                <div class="item"><p>d&#41; {{ pregunta.respostes[3].etiqueta }}</p></div>
                <div class="item"><p>Resposta correcta: {{ pregunta.resposta_correcta }}</p></div>
                <div class="b"><button class="boto1" @click="updatePregunta(pregunta.id)">Update</button></div>
                <div class="b"><button class="boto2" @click="deletePregunta(pregunta.id)">Delete</button></div>
            </div>
            </div>

            <!-- Formulari per afegir una nova pregunta, només visible quan `mostrarFormulari` és cert -->
            <div class="formulari" v-if="mostrarFormulari">
            <h2>Afegir Nova Pregunta</h2>
            <input v-model="novaPregunta.pregunta" placeholder="Nova pregunta" />
            <input v-model="novaPregunta.respostes[0].etiqueta" placeholder="Resposta A" />
            <input v-model="novaPregunta.respostes[1].etiqueta" placeholder="Resposta B" />
            <input v-model="novaPregunta.respostes[2].etiqueta" placeholder="Resposta C" />
            <input v-model="novaPregunta.respostes[3].etiqueta" placeholder="Resposta D" /><br>
            <select v-model="novaPregunta.resposta_correcta">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
            </select><br><br>
            <input v-model="novaPregunta.imatge" placeholder="URL Imatge" />
            <button @click="afegirPregunta" class="boto1">Afegir Pregunta</button>
            </div>
        </div>
    </body>
</template>

<style>
  .container {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     gap: 20px;
  }

  .formulari {
     flex: 0.5;
     padding: 20px;
     background-color: #fff;
     border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .preguntes {
      flex: 1;
  }

  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
  }

  .titol {
      text-align: center;
      margin: 20px 0;
      color: #333;
  }

  .graella {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 20px auto;
      max-width: 600px; 
      padding: 15px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .item {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      transition: background-color 0.3s;
  }

  .item:hover {
      background-color: #eaeaea;
  }

  .botoAfegir {
      text-align: center;
      margin: 20px 0;
  }

  .boto1 {
      text-align: center;
      margin-top: 10px;
      background-color: #28a745;
  }

  .boto2 {
      text-align: center;
      margin-top: 10px;
      background-color: #bf1313;
  }

  .b {
    text-align: center;
  }

  .a {
    background-color: #79ce8c;
  }

  button {
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
  }

  .boto1:hover {
      background-color: #218838;
  }

  .boto2:hover {
      background-color: #850909;
  }

  .a:hover {
      background-color: #218838;
  }

  button:focus {
      outline: none;
  }
</style>


