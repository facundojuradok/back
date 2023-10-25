const mysql = require('mysql2/promise');

// pool de conexiones a la base de datos
const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});


module.exports = conexion