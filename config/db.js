import Sequelize from 'sequelize';
import dotenv from 'dotenv';    //importando la clase con las variables de entorno

dotenv.config();    //accede a las variables de entorno

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//     host: process.env.DB_HOST ,
//     port: '3306',
//     dialect: 'mysql',
const db = new Sequelize(process.env.DATABASE_URL, {
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;