const conexion = require('./conexionBD');

const crearUsuario = async (usuario) => { // Agregar usuario como argumento
    const consulta = 'INSERT INTO usuario SET ?';
    const [usuarioNuevo] = await conexion.query(consulta, usuario);

    return usuarioNuevo;
}

module.exports = {
    crearUsuario
}
