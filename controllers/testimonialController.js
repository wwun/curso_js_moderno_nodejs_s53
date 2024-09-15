import { Testimonial } from "../models/Testimoniales.js";

export const guardarTestimonial = async (req, res) => {

    //validar
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === ''){
        errores.push({mensaje: 'el nombre esta vacio'});
    }

    if(correo.trim() === ''){
        errores.push({mensaje: 'el correo esta vacio'});
    }

    if(mensaje.trim() === ''){
        errores.push({mensaje: 'el mensaje esta vacio'});
    }
    
    if(errores.length > 0){

        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll()

        //mostrar la vista con errores
        res.render('testimoniales', {   //recordar qe render toma dos parametros, la primera es la vista y la segunda la informacion
            pagina: 'testimoniales',    //se pasan dos valores, el nombre de la pagina y los errores
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
            //se agrega nombre, correo y mensajes para mantener los valores escritos en el formulario cuando se lance la validacion con errores
        });
    }else{
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        }catch(error){
            console.log(error);
        }
    }
}