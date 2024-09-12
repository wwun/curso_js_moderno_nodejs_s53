//const express = require('express'); //del paqete express instalado se extrae express, se importa express, require es de common js no de javascript pero es la manera antigua aunqe muy usada
import express from 'express';  //hace lo mismo qe require, se debe agregar en package.json "type": "module",
import router from './routes/index.js'; //se importa el router que es la instancia de express y qe contiene los gets

const app = express();  //extrae la función para ejecutar express

//definir puerto
const port = process.env.port || 4000;  //process.env.port es la variable de entorno, en local se va a usar 4000 hasta qe se haga el deployment

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


//definir la carpeta pública
app.use(express.static('public'));

//agregar router
app.use('/', router);   //use soporta get, put, post y patch

app.listen(port, () => {    //arranca el servidor y se activa en esucha por el puerto asignado
    console.log(`el servidor está funcionando en el puerto ${port}`);
});



/*
En los otros casos, no se utiliza next() porque no es necesario pasar el control a la siguiente middleware o ruta. Por ejemplo:

    En app.set('view engine', 'pug'), se establece la configuración de la aplicación y no se necesita pasar el control a la siguiente middleware.
    En app.use(express.static('public')), se habilita el servicio de archivos estáticos y no se necesita pasar el control a la siguiente middleware.
    En app.use('/', router), se agrega el router a la aplicación y no se necesita pasar el control a la siguiente middleware porque el router manejará las solicitudes

En Express.js, cuando se utiliza app.use() o app.set() para agregar middleware o configurar la aplicación, se está estableciendo una configuración global que afecta a todas las solicitudes que pasan por la aplicación.
En estos casos, no es necesario utilizar next() porque la configuración se aplica automáticamente a todas las solicitudes, sin necesidad de pasar el control a la siguiente middleware
*/