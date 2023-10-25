const { Router } = require('express');
const { iniciarSesion, verificar } = require('../../controladores/login');

const { autenticar } = require('../../middleware/autenticar');


const loginRouter = Router();

// Configura tus rutas para el inicio de sesión
loginRouter.post('/', iniciarSesion);
loginRouter.get('/autenticar', autenticar, (req, res) => {
    return res.json({ estado: 'ok', correoElectronico: req.user });
});




module.exports = loginRouter;

