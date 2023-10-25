const {Router} = require('express');

const {asignarCarreraMateria, obtenerMateriasCarrera} = require('../../controladores/materiaCarreras');

const router = Router();

router.get("/:idCarrera", obtenerMateriasCarrera)

router.post("/", asignarCarreraMateria)

module.exports = router;