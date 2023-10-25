const { Router } = require('express');
const router = Router();
const registroDB = require('../baseDatos/registroDB'); 

const bcrypt = require('bcrypt');

const crearUsuario = async (req, res) => { // Definir crearUsuario antes de usarlo
    const { correoElectronico, nombre, apellido, clave } = req.body;
    console.log('Datos recibidos en req.body:', req.body);

    if (!correoElectronico || !nombre || !apellido || !clave) {
        res.status(400).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        // Hashear la contraseña antes de guardarla en la base de datos
        bcrypt.hash(clave, 10, async (err, hashedClave) => {
            if (err) {
                console.error(err);
                res.status(500).json({ estado: 'FALLA', msj: 'Error al hashear la contraseña' });
            } else {
                const usuario = {
                    correoElectronico: correoElectronico,
                    nombre: nombre,
                    apellido: apellido,
                    clave: hashedClave // Usamos la contraseña hasheada
                };

                try {
                    const usuarioNuevo = await registroDB.crearUsuario(usuario);

                    res.status(201).json({ estado: 'ok', msj: 'Usuario creado', dato: usuarioNuevo });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ estado: 'FALLA', msj: 'Error en la creación del usuario' });
                }
            }
        });
    }
};

module.exports = {
    crearUsuario
};