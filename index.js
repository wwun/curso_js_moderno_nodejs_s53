//const express = require('express'); //del paqete express instalado se extrae express, se importa express, require es de common js no de javascript pero es la manera antigua aunqe muy usada
import express from 'express';  //hace lo mismo qe require, se debe agregar en package.json "type": "module",
import dotenv from 'dotenv';    //importando la clase con las variables de entorno
import router from './routes/index.js'; //se importa el router que es la instancia de express y qe contiene los gets, es el encargado de registrar todas las url o endpoints qe la aplicación soporta, por ejemplo si se accede a /productos, el router llama a un controlador qe se comunica con el modelo paraobtener los datos qe son pasados a la vista
import db from './config/db.js';

dotenv.config();    //accede a las variables de entorno

console.log(process.env.DATABASE);  //accede a las variables con process.env.DATABASE

const app = express();  //extrae la función para ejecutar express

//conectar a la base de datos
db.authenticate()
    .then( () => console.log('base de datos conectada'))
    .catch( error => console.log(error));

//definir puerto
const port = process.env.PORT || 4000;  //process.env.port es la variable de entorno, en local se va a usar 4000 hasta qe se haga el deployment

//habilitar pug
app.set('view engine', 'pug');

//obtener el anio actual
app.use((req, res, next) => {   //responde a todos los verbos, next es para cuando se termine de ejecutar y pueda llamar al siguiente middleware, notar qe se ejecuta en todos los verbos y cuando una pagina tiene una interaccion, se pueden ejecutar varios verbos
    const year = new Date();
    res.locals.actualYear = year.getFullYear(); //locals son como variables internas de express, es una manera de compartir variables con la vista, por ejemplo el footer solo necesita tener actualYear y estara disponible, asi como las otras paginas
    res.locals.nombresitio = "agencia de viajes";
    return next(); //cuando termina define qe debe ir al siguiente middleware
});

//diferencia entre las maneras de pasar datos a la vista
// res.locals, se utiliza para compartir variables entre todas las vistas (plantillas) de la aplicación, los datos se asignan a res.locals y están disponibles en todas las vistas, se utiliza para pasar datos que son comunes a varias vistas, como el año actual, el título de la página, etc, los datos se mantienen entre solicitudes, por lo que no es necesario volver a asignarlos en cada solicitud
// res.render(), se utiliza para pasar datos específicos a una vista (plantilla) en particular, los datos se pasan como un objeto en el segundo argumento de res.render(), los datos solo están disponibles en la vista que se está renderizando en ese momento, se utiliza para pasar datos que son específicos para una sola vista

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//definir la carpeta pública
app.use(express.static('public'));

//agregar router
app.use('/', router);   //use soporta get, put, post y patch

app.listen(port, () => {    //arranca el servidor y se activa en esucha por el puerto asignado
    console.log(`el servidor está funcionando en el puerto ${port}`);
});

//instalar npm install mysql2 sequelize

//creando las variables de entorno
//npm i dotenv
//se importa las dependencias
//se crea un archivo .env


/*
En los otros casos, no se utiliza next() porque no es necesario pasar el control a la siguiente middleware o ruta. Por ejemplo:

    En app.set('view engine', 'pug'), se establece la configuración de la aplicación y no se necesita pasar el control a la siguiente middleware.
    En app.use(express.static('public')), se habilita el servicio de archivos estáticos y no se necesita pasar el control a la siguiente middleware.
    En app.use('/', router), se agrega el router a la aplicación y no se necesita pasar el control a la siguiente middleware porque el router manejará las solicitudes

En Express.js, cuando se utiliza app.use() o app.set() para agregar middleware o configurar la aplicación, se está estableciendo una configuración global que afecta a todas las solicitudes que pasan por la aplicación.
En estos casos, no es necesario utilizar next() porque la configuración se aplica automáticamente a todas las solicitudes, sin necesidad de pasar el control a la siguiente middleware
*/