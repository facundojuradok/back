const {Router} = require('express');



const router = Router();

router.get("/:idEstudianteCarrera", obtenerCarrerasEstudiante)

router.post("/", asignarCarreraAEstudiante)

module.exports = router;