const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { autenticar } = require('../../middleware/autenticar');


const loginRouter = Router();

// Configura tus rutas para el Cierre de sesión
loginRouter.get('/', autenticar, (req, res) => {
    const token = res.clearCookie('token');
    return res.json({ estado: 'ok', msj: 'Cierre de sesión exitoso' });
});




module.exports = loginRouter;

