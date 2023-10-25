const {Router} = require('express');

const {obtenerMateriasEstudiante, asignarMateriaAEstudiante} = require('../../controladores/matricularMaterias');


const router = Router();

router.get("/:idEstudianteMateria", obtenerMateriasEstudiante)

router.post("/", asignarMateriaAEstudiante)

module.exports = router;