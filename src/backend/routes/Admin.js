const express = require('express')
const router = express.Router()
const controller = require ('../controllers/Admins')

const Path = 'Admin'

const model = require('../Models/Adminss'); 

router.get(`/checkNitt/:nitt`, async (req, res) => {
    try {
        const nittToCheck = req.params.nitt;

        // Verifica si ya existe un documento con el mismo NIT
        const existingDoc = await model.findOne({ nitt: nittToCheck });

        if (existingDoc) {
            // El documento ya existe
            res.status(409).send({ error: 'El NIT ya existe.' });
        } else {
            // El NIT no existe
            res.status(200).send({ success: 'El NIT está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar el NIT:', error);
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