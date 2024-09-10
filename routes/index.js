import express from 'express';

const router = express.Router();    //se usa la misma instancia de express qe se crea en index.js porqe sino no estarian conectados

router.get('/', (req, res) => {    //esta es la manera en la qe se manejan los verbos, en este caso get, req es lo qe enviamos y res lo qe express responde
    //res.send('inicio'); //res.send('Hola mundo'); es la manera en la qe se muestra la información
    // res.json({  //muestra la información en formato json
    //     id:1
    // });
    res.render('inicio');   //este es el más común para mostrar una vista
});

router.get('/nosotros', (req, res) => {

    const viajes = 'viajes a alemania';

    res.render('nosotros', {
        viajes //viajes:viajes
    }); //busca el archivo nosotros.pug
});

export default router;