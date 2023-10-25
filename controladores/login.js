const { Router } = require('express');
const router = Router();
const registroDB = require('../baseDatos/loginBD'); 
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const TOKEN_SECRET = process.env.TOKEN_SECRET; 

const iniciarSesion = async (req, res) => {
    const { correoElectronico, clave } = req.body;

    if (!correoElectronico || !clave) {
        res.status(400).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
        return;
    }

    try {
        const usuarios = await registroDB.buscarUsuarioPorCorreo(correoElectronico);

        if (usuarios.length === 0) {
            res.status(401).json({ estado: 'FALLA', msj: 'Usuario no encontrado' });
            return;
        }

        const usuario = usuarios[0];

        bcrypt.compare(clave, usuario.clave, (err, resultado) => {
            if (err) {
                res.status(500).json({ estado: 'FALLA', msj: 'Error al verificar la contraseña' });
                return;
            }

            if (resultado) {
                const name = usuario.name;
                const token = jwt.sign({ correoElectronico: usuario.correoElectronico }, TOKEN_SECRET, { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ estado: 'ok', correoElectronico: usuario.correoElectronico });
                
            } else {
                res.status(401).json({ estado: 'FALLA', msj: 'Contraseña incorrecta' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLA', msj: 'Error en el inicio de sesión' });
    }
};




module.exports = {
    iniciarSesion,
};
