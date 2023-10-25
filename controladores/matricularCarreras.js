const { asignarCarreraAEstudiante, obtenerCarrerasEstudiante } = require('../baseDatos/matricularCarrera');

// Controlador para matricular a un estudiante en una carrera
const matricularCarreraController = async (req, res) => {
    try {
        const { idCarrera, idEstudiante } = req.body;

        const resultado = await asignarCarreraAEstudiante(idCarrera, idEstudiante);

        res.status(200).json({ message: 'Estudiante matriculado en la carrera con éxito', resultado });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener las carreras de un estudiante
const obtenerCarrerasEstudianteController = async (req, res) => {
    try {
        const idEstudiante = req.params.idEstudiante;

        const carreras = await obtenerCarrerasEstudiante(idEstudiante);

        res.status(200).json({ carreras });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    matricularCarreraController,
    obtenerCarrerasEstudianteController
};
