const { Router } = require('express');
const {
    buscarCarreraPorId,
    buscarTodasCarreras,
    eliminarCarrera,
    crearCarrera,
    actualizarCarrera
} = require('../../controladores/carreras');

const router = Router();

// Agregar una nueva carrera
router.post('/carreras', crearCarrera);

// Eliminar una carrera por ID
router.delete('/carreras/:idCarrera', eliminarCarrera);

// Actualizar una carrera por ID
router.put('/carreras/:idCarrera', actualizarCarrera);

// Obtener todas las carreras
router.get('/carreras', buscarTodasCarreras);

// Buscar una carrera por ID
router.get('/carreras/:idCarrera', buscarCarreraPorId);

module.exports = router;
