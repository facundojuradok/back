const conexion = require('./conexionBD');
const { buscarCarreraPorId } = require('./carrerasBD');
const {buscarMateriaPorId} = require('./materiaBD');
const {buscarPorId} = require ('./estudianteBD');

const asignarMateriaAEstudiante = async (idMateria, idEstudiante) => {
    const estudiante = await buscarPorId(idEstudiante);
    if (!estudiante) throw new Error('No existe el estudiante');
    const consulta = 'INSERT INTO estudiantemateria (idEstudiante, idMateria) VALUES (?, ?)';
    const [resultado] = await conexion.query(consulta, [idEstudiante, idMateria]);
    return resultado;
};

const obtenerMateriasEstudiante = async (idEstudiante) => {
    const consulta = `
    SELECT m.idMateria, m.nombre FROM estudiantemateria AS em
    JOIN materia AS m ON em.idMateria = m.idMateria
    WHERE em.idEstudiante = ?`;

    const [resultados] = await conexion.query(consulta, idEstudiante);

    const materias = resultados.map((resultado) => ({
        idMateria: resultado.idMateria,
        nombre: resultado.nombre,
    }));

    return materias;
};

module.exports = {
    asignarMateriaAEstudiante,
    obtenerMateriasEstudiante
};