import { Sequelize } from "sequelize";
import db from '../config/db.js';   //importa la base de datos configurada

//- db.define('testimoniales es el nombre de la tabla en la base de datos
export const Testimonial = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
})