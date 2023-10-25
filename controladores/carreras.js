const carreraBD = require('../baseDatos/carrerasBD');

buscarCarreraPorId = async (req, res) => {
    try {
        const idCarrera = req.params.idCarrera;

        if (!idCarrera) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id de la carrera' });
        }

        const carrera = await carreraBD.buscarCarreraPorId(idCarrera);

        res.json({ estado: 'OK', dato: carrera });

    } catch (exec) {
        throw exec;
    }
}

buscarTodasCarreras = async (req, res) => {
    try {
        const carreras = await carreraBD.buscarTodasCarreras();

        res.json({ estado: 'OK', dato: carreras });

    } catch (exec) {
        throw exec;
    }
}

eliminarCarrera = async (req, res) => {
    try {
        const idCarrera = req.params.idCarrera;

        if (!idCarrera) {
            res.status(404).json({ estado: 'FALLO', msj: 'Especifica el ID de la carrera que quieres eliminar' });
        } else {
            try {
                await carreraBD.eliminarCarrera(idCarrera);
                res.json({ estado: 'OK', msj: 'Carrera eliminada' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar eliminar la carrera' });
            }
        }

    } catch (exec) {
        throw exec;
    }
}

crearCarrera = async (req, res) => {
    const { nombre, modadlida } = req.body;

    if (!nombre || !modadlida) {
        res.status(400).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        const carrera = {
            nombre: nombre,
            modadlida: modadlida
        };

        try {
            const carreraNueva = await carreraBD.nuevaCarrera(carrera);
            res.status(201).json({ estado: 'OK', msj: 'Carrera creada', dato: carreraNueva });
        } catch (exec) {
            throw exec;
        }
    }
};

actualizarCarrera = async (req, res) => {
    try {
        const idCarrera = req.params.idCarrera;
        const { nombre, modadlida } = req.body;

        if (!idCarrera) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id de la carrera que quieres actualizar' });
        } else if (!nombre || !modadlida) {
            res.status(400).json({ estado: 'FALLO', msj: 'Faltan datos necesarios para actualizar' });
        } else {
            const carreraActualizada = {
                nombre: nombre,
                modadlida: modadlida
            };

            try {
                await carreraBD.actualizarCarrera(idCarrera, carreraActualizada);
                res.json({ estado: 'OK', msj: 'Carrera actualizada exitosamente', dato: carreraActualizada });
            } catch (error) {
                console.error(error);
                res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar actualizar la carrera' });
            }
        }

    } catch (exec) {
        console.error(exec);
        res.status(500).json({ estado: 'FALLO', msj: 'Error interno del servidor' });
    }
};

module.exports = {
    buscarCarreraPorId,
    buscarTodasCarreras,
    eliminarCarrera,
    crearCarrera,
    actualizarCarrera
}