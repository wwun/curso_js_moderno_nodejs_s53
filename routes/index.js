import express from 'express';

const router = express.Router();    //se usa la misma instancia de express qe se crea en index.js porqe sino no estarian conectados

router.get('/', (req, res) => {    //esta es la manera en la qe se manejan los verbos, en este caso get, req es lo qe enviamos y res lo qe express responde
    //res.send('inicio'); //res.send('Hola mundo'); es la manera en la qe se muestra la información
    // res.json({  //muestra la información en formato json
    //     id:1
    // });
    res.render('inicio', {
        pagina: 'Inicio'
    });   //este es el más común para mostrar una vista
});

//diferencia entre las maneras de pasar datos a la vista
// res.locals, se utiliza para compartir variables entre todas las vistas (plantillas) de la aplicación, los datos se asignan a res.locals y están disponibles en todas las vistas, se utiliza para pasar datos que son comunes a varias vistas, como el año actual, el título de la página, etc, los datos se mantienen entre solicitudes, por lo que no es necesario volver a asignarlos en cada solicitud
// res.render(), se utiliza para pasar datos específicos a una vista (plantilla) en particular, los datos se pasan como un objeto en el segundo argumento de res.render(), los datos solo están disponibles en la vista que se está renderizando en ese momento, se utiliza para pasar datos que son específicos para una sola vista

router.get('/nosotros', (req, res) => {
    //const viajes = 'viajes a alemania';
    res.render('nosotros', {
        pagina: 'nosotros' //viajes:viajes esto se podria hacer 
    }); //busca el archivo nosotros.pug
});

router.get('/viajes', (req, res) => {
    res.render('viajes', {
        pagina: 'viajes'
    }); //busca el archivo viajes.pug
});

router.get('/testimoniales', (req, res) => {
    res.render('testimoniales', {
        pagina: 'testimoniales'
    }); //busca el archivo viajes.pug
});

export default router;