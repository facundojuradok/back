const { Router } = require('express');

const {
    crearUsuario,
} = require('../../controladores/registro');

const router = Router();

router.post('/', crearUsuario);

module.exports = router;
