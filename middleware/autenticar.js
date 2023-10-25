
const { Router } = require('express');
const registroDB = require('../baseDatos/loginBD'); 
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET; 

const autenticar = (req, res, next) => {
    // Obtener el token de la cookie
    const token = req.cookies.token;
  
    // Si no hay token, el usuario no está autenticado
    if (!token) {
      return res.status(401).json({ estado: 'FALLA', msj: 'No estás autenticado' });
    } else {
        jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ estado: 'FALLA', msj: 'No estás autenticado' });
            }
            // Si el token es válido, el usuario está autenticado
            req.user = decoded.correoElectronico;
            next();
        });
    }
};

module.exports = {
    autenticar,
};