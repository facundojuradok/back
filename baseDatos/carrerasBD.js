const conexion = require('./conexionBD');

const buscarCarreraPorId = async (idCarrera) => {
    const consulta = `
        SELECT idCarrera, nombre,
        (CASE
            WHEN modadlida = 1 THEN 'Presencial'
            WHEN modadlida = 2 THEN 'Virtual'
            ELSE ''
        END) AS modalidad
        FROM carrera
        WHERE idCarrera = ?`;

    const [carrera] = await conexion.query(consulta, idCarrera);
    return carrera;
}

const buscarTodasCarreras = async () => {
    const consulta = `
      SELECT idCarrera, nombre,
      (CASE
          WHEN modadlida = 1 THEN 'Presencial'
          WHEN modadlida = 2 THEN 'Virtual'
          ELSE ''
      END) AS modalidad
      FROM carrera
      WHERE activo = 1`; // Filtrar carreras activas
  
    const [carreras] = await conexion.query(consulta);
    return carreras;
  }
  

const eliminarCarrera = async (idCarrera) => {
    const consulta = `UPDATE carrera SET activo = 0 WHERE idCarrera = ?`;
    const [carrera] = await conexion.query(consulta, [idCarrera]);
    return carrera;
}

const actualizarCarrera = async (idCarrera, datosActualizados) => {
    const { nombre, modadlida } = datosActualizados;

    const consulta = `
        UPDATE carrera
        SET
            nombre = ?,
            modadlida =?
        WHERE idCarrera = ?
    `;

    const [resultado] = await conexion.query(consulta, [nombre, modadlida, idCarrera]);

    return resultado;
}

const nuevaCarrera = async (carrera) => {

    carrera.activo = 1; // Activar carrera por defecto
  
    const consulta = 'INSERT INTO carrera SET ?';
    const [carreraNueva] = await conexion.query(consulta, carrera);
    return carreraNueva;
  }
  
module.exports = {
    buscarCarreraPorId,
    buscarTodasCarreras,
    eliminarCarrera,
    actualizarCarrera,
    nuevaCarrera,
}
