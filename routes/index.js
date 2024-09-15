import express from 'express';
import { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();    //se usa la misma instancia de express qe se crea en index.js porqe sino no estarian conectados

router.get('/', paginaInicio);

/*
//este método es reemplazado por router.get('/', paginaInicio);
router.get('/', (req, res) => {    //esta es la manera en la qe se manejan los verbos, en este caso get, req es lo qe enviamos y res lo qe express responde
    //res.send('inicio'); //res.send('Hola mundo'); es la manera en la qe se muestra la información
    // res.json({  //muestra la información en formato json
    //     id:1
    // });
    res.render('inicio', {
        pagina: 'Inicio'
    });   //este es el más común para mostrar una vista
});
*/

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;