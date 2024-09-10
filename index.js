//const express = require('express'); //del paqete express instalado se extrae express, se importa express, require es de common js no de javascript pero es la manera antigua aunqe muy usada
import express from 'express';  //hace lo mismo qe require, se debe agregar en package.json "type": "module",
import router from './routes/index.js'; //se importa el router que es la instancia de express y qe contiene los gets

const app = express();  //extrae la función para ejecutar express

//definir puerto
const port = process.env.port || 4000;  //process.env.port es la variable de entorno, en local se va a usar 4000 hasta qe se haga el deployment

//habilitar pug
app.set('view engine', 'pug');

//agregar router
app.use('/', router);   //use soporta get, put, post y patch

app.listen(port, () => {    //arranca el servidor y se activa en esucha por el puerto asignado
    console.log(`el servidor está funcionando en el puerto ${port}`);
});