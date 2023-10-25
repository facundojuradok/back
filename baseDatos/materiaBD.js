const conexion = require('./conexionBD');

const buscarMateriaPorId = async (idMateria) => {
    const consulta = `
        SELECT idMateria, horasSemanales, nombre, tipoMateria
        FROM materia
        WHERE idMateria = ?`;

    const [materia] = await conexion.query(consulta, idMateria);
    return materia;
}

const buscarTodasMaterias = async () => {
    const consulta = `
        SELECT idMateria, horasSemanales, nombre, tipoMateria
        FROM materia`;

    const [materias] = await conexion.query(consulta);
    return materias;
}

const eliminarMateria = async (idMateria) => {
    const consulta = `UPDATE materia SET activo = 0 WHERE idMateria = ?`;
    const [materia] = await conexion.query(consulta, [idMateria]);
    return materia;
}

const actualizarMateria = async (idMateria, datosActualizados) => {
    const { horasSemanales, nombre, tipoMateria } = datosActualizados;

    const consulta = `
        UPDATE materia
        SET
            horasSemanales = ?,
            nombre = ?,
            tipoMateria = ?
        WHERE idMateria = ?
    `;

    const [resultado] = await conexion.query(consulta, [horasSemanales, nombre, tipoMateria, idMateria]);

    return resultado;
}

const nuevaMateria = async (materia) => {
    const consulta = 'INSERT INTO materia SET ?';
    const [materiaNueva] = await conexion.query(consulta, materia);
    return materiaNueva;
}

module.exports = {
    buscarMateriaPorId,
    buscarTodasMaterias,
    eliminarMateria,
    actualizarMateria,
    nuevaMateria,
}
