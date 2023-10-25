const { Router } = require('express');
const {
    buscarMateriaPorId,
    buscarTodasMaterias,
    eliminarMateria,
    crearMateria,
    actualizarMateria
} = require('../../controladores/materias');

const router = Router();

// Agregar una nueva materia
router.post('/materias', crearMateria);

// Eliminar una materia por ID
router.delete('/materias/:idMateria', eliminarMateria);

// Actualizar una materia por ID
router.put('/materias/:idMateria', actualizarMateria);

// Obtener todas las materias
router.get('/materias', buscarTodasMaterias);

// Buscar una materia por ID
router.get('/materias/:idMateria', buscarMateriaPorId);

module.exports = router;
