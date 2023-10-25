const conexion = require('./conexionBD');
const { buscarCarreraPorId } = require('./carrerasBD');
const {buscarMateriaPorId} = require('./materiaBD');
const {buscarPorId} = require ('./estudianteBD');

const asignarCarreraAEstudiante = async (idCarrera, idEstudiante) => {
    const estudiante = await buscarPorId(idEstudiante);
    if (!estudiante) throw new Error('No existe el estudiante');
    const consulta = 'INSERT INTO estudiantecarrera (idEstudiante, idCarrera) VALUES (?, ?)';
    const [resultado] = await conexion.query(consulta, [idEstudiante, idCarrera]);
    return resultado;
};

// Obtener las carreras de un estudiante por su id
const obtenerCarrerasEstudiante = async (idEstudiante) => {
    const consulta = `
    SELECT c.idCarrera, c.nombre FROM estudiantecarrera AS ec
    JOIN carrera AS c ON ec.idCarrera = c.idCarrera
    WHERE ec.idEstudiante = ?`;

    const [resultados] = await conexion.query(consulta, idEstudiante);

    const carreras = resultados.map((resultado) => ({
        idCarrera: resultado.idCarrera,
        nombre: resultado.nombre,
    }));

    return carreras;
};

module.exports = {
    asignarCarreraAEstudiante,
    obtenerCarrerasEstudiante
};