const materiasCarrera = require('../baseDatos/carreramaterias');

const obtenerMateriasCarrera = async (req, res) => {
    const { idCarrera } = req.params;
    try {
        const resultado = await materiasCarrera.obtenerMateriasCarrera(idCarrera);
        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error.message });
    }
}

const asignarCarreraMateria = async (req, res) => {
    const { idMateria, idCarrera } = req.body;
    try {
        const resultado = await materiasCarrera.asignarCarreraMateria(idMateria, idCarrera);
        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: error.message });
    }
}

module.exports = {
    asignarCarreraMateria,
    obtenerMateriasCarrera
}