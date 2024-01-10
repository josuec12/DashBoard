const express = require('express')
const router = express.Router()
const controller = require ('../controllers/Admins')

const Path = 'Admin'

const model = require('../Models/Adminss'); 

router.get(`/checkCedula/:cedula`, async (req, res) => {
    try {
        const cedulaToCheck = req.params.cedula;

        // Verifica si ya existe un documento con la misma cedula 
        const existingDoc = await model.findOne({ cedula: cedulaToCheck });

        if (existingDoc) {
            // El documento ya existe
            res.status(409).send({ error: 'El Cedula ya existe.' });
        } else {
            // La cedula no existe
            res.status(200).send({ success: 'El Cedula está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar la Cedula:', error);
        res.status(500).send({ error: 'Error interno del servidor.' });
    }
});

router.get(`/checkEmaila/:emaila`, async (req, res) => {
    try {
        const emailaToCheck = req.params.emaila;

        // Verifica si ya existe un documento con el mismo Email
        const existingDoc = await model.findOne({ emaila: emailaToCheck });

        if (existingDoc) {
            // El documento ya existe
            res.status(409).send({ error: 'El Email ya existe.' });
        } else {
            // El Email no existe
            res.status(200).send({ success: 'El Email está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar la Cedula:', error);
        res.status(500).send({ error: 'Error interno del servidor.' });
    }
});

router.get(`/checkCedulaID/:cedula/:id`, async (req, res) => {
    try {
        const cedulaToCheck = req.params.cedula;
        const idToCheck = req.params.id;

        // Verifica si ya existe un documento con el mismo NIT
        const existingDoc = await model.findOne({ cedula: cedulaToCheck });

        if (existingDoc) {
            // Si el documento ya existe
            if (existingDoc.id.toString() === idToCheck.toString()) {
                res.status(200).send({ success: 'La cédula está disponible y el ID coincide.' });
            } else {
                // Si el documento ya existe pero el ID es diferente
                res.status(409).send({ error: 'La cédula ya existe, pero el ID es diferente.' });
            }
        } else {
            // La cédula no existe
            res.status(200).send({ success: 'La cédula está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar la cédula:', error);
        res.status(500).send({ error: 'Error interno del servidor.' });
    }
});

router.get(`/checkEmailaID/:emaila/:id`, async (req, res) => {
    try {
        const emailaToCheck = req.params.emaila;
        const idToCheck = req.params.id;

        // Verifica si ya existe un documento con el mismo Email
        const existingDoc = await model.findOne({ emaila: emailaToCheck });

        if (existingDoc) {
            // Si el documento ya existe
            if (existingDoc.id.toString() === idToCheck.toString()) {
                res.status(200).send({ success: 'El Email está disponible y el ID coincide.' });
            } else {
                // Si el documento ya existe pero el ID es diferente
                res.status(409).send({ error: 'El Email ya existe, pero el ID es diferente.' });
            }
        } else {
            // El Email no existe
            res.status(200).send({ success: 'El Email está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar el Email:', error);
        res.status(500).send({ error: 'Error interno del servidor.' });
    }
});

router.get(
    `/${Path}`,
    controller.getData
)

router.post(
    `/${Path}`,
    controller.insertData,
)

router.put(
    `/${Path}/:id`,
    controller.updateSingle
)

router.delete(
    `/${Path}/:id`,
    controller.deleteSingle
)

module.exports = router;