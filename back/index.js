const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;
const { spawn } = require('child_process');


// Middleware per parsejar JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// Carregar preguntes des del fitxer JSON
let preguntes = require('./../doc/Questionari.json').preguntes;

// CRUD - Read (GET): Llistar totes les preguntes
app.get('/preguntes', (req, res) => {
  res.json(preguntes);
});

// CRUD - Read (GET): Obtenir una pregunta per id
app.get('/preguntes/:id', (req, res) => {
  const preguntaId = parseInt(req.params.id);
  const pregunta = preguntes.find(p => p.id === preguntaId);
  if (!pregunta) {
    return res.status(404).send('Pregunta no trobada');
  }
  res.json(pregunta);
});

// CRUD - Create (POST): Afegir una nova pregunta
app.post('/preguntes', (req, res) => {
  const novaPregunta = req.body;
  novaPregunta.id = preguntes.length + 1;
  preguntes.push(novaPregunta);
  fs.writeFileSync('./../doc/Questionari.json', JSON.stringify({ preguntes }, null, 2));
  res.status(201).json(novaPregunta);
});

// CRUD - Update (PUT): Actualitzar una pregunta existent
app.put('/preguntes/:id', (req, res) => {
    const preguntaId = parseInt(req.params.id);
    const pregunta = preguntes.find(p => p.id === preguntaId);
  
    if (!pregunta) {
      return res.status(404).send('Pregunta no trobada');
    }
  
    // Actualitzar els camps de la pregunta
    pregunta.pregunta = req.body.pregunta || pregunta.pregunta;
    pregunta.respostes = req.body.respostes || pregunta.respostes;
    pregunta.resposta_correcta = req.body.resposta_correcta || pregunta.resposta_correcta;
    pregunta.imatge = req.body.imatge || pregunta.imatge;
  
    fs.writeFileSync('./../doc/Questionari.json', JSON.stringify({ preguntes }, null, 2));
    res.json(pregunta);
  });

// CRUD - Delete (DELETE): Esborrar una pregunta per id
app.delete('/preguntes/:id', (req, res) => {
  const preguntaId = parseInt(req.params.id);
  const index = preguntes.findIndex(p => p.id === preguntaId);
  if (index === -1) {
    return res.status(404).send('Pregunta no trobada');
  }
  preguntes.splice(index, 1);
  fs.writeFileSync('./../doc/Questionari.json', JSON.stringify({ preguntes }, null, 2));
  res.status(204).send();
});

//Python
app.get('/python', (req, res) => {
  const pythonProcess = spawn('python', ['./python/calculEstadistiques.py']);
  pythonProcess.stdout.on('data', (data) => {
    res.send(data.toString());
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error('Error en el proceso de Python:', data.toString().trim());
  });
});

// Preguntes per l'Android (sense resposta correcte)
app.get('/partida', (req, res) => {
  const num = req.query.num;
  let llistaPreguntes = [];
  
  for (let i = 0; i < num; i++) {
      var obj = preguntes[i]; 
      llistaPreguntes.push({
          id: obj.id,
          pregunta: obj.pregunta,   
          respostes: obj.respostes,
          imatge: obj.imatge
      });
  }

  res.json(llistaPreguntes);
});

// Comprovar Respostes
app.post('/respostes', (req, res) => {
  const userResponses = req.body; 

  let results = {
    correct: 0,
    incorrect: 0
  };

  for (item in userResponses) {
    const p = preguntes.find(p => p.id === userResponses[item].pregunta);
    if (userResponses[item].resposta + 1 == p.resposta_correcta) {
      results.correct++;
    } else {
      results.incorrect++;
    }
  }
  res.json(results);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en funcionament a http://localhost:${PORT}`);
});