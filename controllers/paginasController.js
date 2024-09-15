import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

export const paginaInicio = async (req, res) => {    //esta es la manera en la qe se manejan los verbos, en este caso get, req es lo qe enviamos y res lo qe express responde
    //res.send('inicio'); //res.send('Hola mundo'); es la manera en la qe se muestra la información
    // res.json({  //muestra la información en formato json
    //     id:1
    // });

    //consultar 3 viajes del modelo viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));

    try{
        const resultado = await Promise.all(promiseDB); //ejecuta las promesas en paralelo

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });   //este es el más común para mostrar una vista
    }catch(error){
        console.log(error);
    }

}

//diferencia entre las maneras de pasar datos a la vista
// res.locals, se utiliza para compartir variables entre todas las vistas (plantillas) de la aplicación, los datos se asignan a res.locals y están disponibles en todas las vistas, se utiliza para pasar datos que son comunes a varias vistas, como el año actual, el título de la página, etc, los datos se mantienen entre solicitudes, por lo que no es necesario volver a asignarlos en cada solicitud
// res.render(), se utiliza para pasar datos específicos a una vista (plantilla) en particular, los datos se pasan como un objeto en el segundo argumento de res.render(), los datos solo están disponibles en la vista que se está renderizando en ese momento, se utiliza para pasar datos que son específicos para una sola vista
// res.render es un método de Express.js que se utiliza para renderizar una plantilla de motor de plantillas (en este caso, probablemente Handlebars o Pug) y enviar el resultado como respuesta HTTP

export const paginaNosotros = (req, res) => {
    //const viajes = 'viajes a alemania';
    res.render('nosotros', {
        pagina: 'nosotros'
    }); //busca el archivo nosotros.pug
}


export const paginaViajes = async (req, res) => {

    const viajes = await Viaje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina: 'próximos viajes',
        viajes,                 //viajes: viajes
    }); //busca el archivo viajes.pug
};

//muestra un viaje por su slug
export const paginaDetalleViaje = async (req, res) => {  //se asocia con router.get('/viajes/:viaje', paginaDetalleViaje)   //qe es llamado por a(href=`viajes/${viaje.slug}`
    const { slug } = req.params;

    try{
        const viaje = await Viaje.findOne({ where : {slug}});

        //{ pagina: 'información viaje', resultado } objeto que contiene los datos que se van a pasar a la plantilla, en este caso, se pasan dos propiedades: pagina, string que contiene el título de la página, resultado es el resultado de la consulta a la base de datos, que se almacenó en la variable resultado anteriormente
        res.render('viaje', {   //'viaje': Es el nombre de la plantilla que se va a renderizar, en este caso, se asume que hay una plantilla llamada viaje.hbs o viaje.pug en la carpeta de vistas
            pagina: 'información viaje',
            viaje
        });

    }catch(error){
        console.log(error);
    }
}

export const paginaTestimoniales = async (req, res) => {

    try{
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'testimoniales',
            testimoniales
        }); //busca el archivo viajes.pug
    }catch(error){

    }

};