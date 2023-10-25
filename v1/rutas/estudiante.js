const {Router} = require('express');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require('../../controladores/estudiante');
// const { actualizar } = require('../../baseDatos/estudianteBD');

const { autenticar } = require('../../middleware/autenticar');



const router = Router();


//agregar
router.post('/estudiantes', autenticar, crear);

// //eliminar
router.delete('/estudiantes/:idEstudiante', autenticar, eliminar);

// //actualizar
router.put('/estudiantes/:idEstudiante', autenticar, actualizar);

// //buscar
router.get('/estudiantes', autenticar, buscarTodos);

//buscarPorID
router.get('/estudiantes/:idEstudiante', autenticar, buscarPorId);



module.exports = router;