const conexion = require('./conexionBD');

const buscarUsuarioPorCorreo = async (correoElectronico) => {
    const consulta = 'SELECT * FROM usuario WHERE correoElectronico = ?';
    const [usuarios] = await conexion.query(consulta, [correoElectronico]);

    return usuarios;
}

module.exports = {
    buscarUsuarioPorCorreo
};
