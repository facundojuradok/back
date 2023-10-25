const materiaBD = require('../baseDatos/materiaBD');

buscarMateriaPorId = async (req, res) => {
    try {
        const idMateria = req.params.idMateria;

        if (!idMateria) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id de la materia' });
        }

        const materia = await materiaBD.buscarMateriaPorId(idMateria);

        res.json({ estado: 'OK', dato: materia });

    } catch (exec) {
        throw exec;
    }
}

buscarTodasMaterias = async (req, res) => {
    try {
        const materias = await materiaBD.buscarTodasMaterias();

        res.json({ estado: 'OK', dato: materias });

    } catch (exec) {
        throw exec;
    }
}

eliminarMateria = async (req, res) => {
    try {
        const idMateria = req.params.idMateria;

        if (!idMateria) {
            res.status(404).json({ estado: 'FALLO', msj: 'Especifica el ID de la materia que quieres eliminar' });
        } else {
            try {
                await materiaBD.eliminarMateria(idMateria);
                res.json({ estado: 'OK', msj: 'Materia eliminada' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar eliminar la materia' });
            }
        }

    } catch (exec) {
        throw exec;
    }
}

crearMateria = async (req, res) => {
    const { horasSemanales, nombre, tipoMateria } = req.body;

    if (!horasSemanales || !nombre || !tipoMateria) {
        res.status(400).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
    } else {
        const materia = {
            horasSemanales: horasSemanales,
            nombre: nombre,
            tipoMateria: tipoMateria
        };

        try {
            const materiaNueva = await materiaBD.nuevaMateria(materia);
            res.status(201).json({ estado: 'OK', msj: 'Materia creada', dato: materiaNueva });
        } catch (exec) {
            throw exec;
        }
    }
};

actualizarMateria = async (req, res) => {
    try {
        const idMateria = req.params.idMateria;
        const { horasSemanales, nombre, tipoMateria } = req.body;

        if (!idMateria) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id de la materia que quieres actualizar' });
        } else if (!horasSemanales || !nombre || !tipoMateria) {
            res.status(400).json({ estado: 'FALLO', msj: 'Faltan datos necesarios para actualizar' });
        } else {
            const materiaActualizada = {
                horasSemanales: horasSemanales,
                nombre: nombre,
                tipoMateria: tipoMateria
            };

            try {
                await materiaBD.actualizarMateria(idMateria, materiaActualizada);
                res.json({ estado: 'OK', msj: 'Materia actualizada exitosamente', dato: materiaActualizada });
            } catch (error) {
                console.error(error);
                res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar actualizar la materia' });
            }
        }

    } catch (exec) {
        console.error(exec);
        res.status(500).json({ estado: 'FALLO', msj: 'Error interno del servidor' });
    }
};

module.exports = {
    buscarMateriaPorId,
    buscarTodasMaterias,
    eliminarMateria,
    crearMateria,
    actualizarMateria
}
