const express = require ("express");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
let mySession = [];

const fs = require("fs");
const dataQuiz = JSON.parse(fs.readFileSync('./../doc/Qüestionari.json', 'utf8'));

app.post("/getPreguntes", (req, res) => {
    
});

app.get("/", (req, res)=>{

    //creo la session si no exiteix, o la recupero si exiteix.
    var sessionId = getMySessionId(req.query["sessionId"]);
    //recupero la meva sessio de l'array de session 
    obj = mySession[sessionId];

    //Modifico la sessio si es necessari
  
    obj.sessionId = sessionId;
    obj.data = "altres dades de l'aplicaicó."

    //torno a guarda la meva informació dintre de l'array de sesssion 
    //dintre de la meva (sessionId)
    mySession[sessionId] = obj;

    json_obj = JSON.stringify(obj)



    res.send (json_obj);
    //res.send("Hello world -"+uuidv4());

});


app.listen(PORT, () => {
    console.log("Servidor Preparat al Port: " + PORT);
});


function getMySessionId(sessionId){
    if(!sessionId){
        sessionId = uuidv4();
        let obj = {};
        obj.sessionId = sessionId;
        obj.data = "la primera data de totes";
        mySession[sessionId] = obj;
    }

    return sessionId;

};
