const express = require('express')
const router = express.Router()
const multer = require('multer');
const controller = require ('../controllers/Besitzs')

const path = 'Besitz'

const storage = multer.diskStorage({
    destination: 'File',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const File = multer({ storage: storage })

  router.post(`/${path}`, File.fields([{ name: 'boletin' }, { name: 'logo' }]), controller.insertData);

  router.use('/File', express.static('File'));


  const model = require('../Models/Besitzss'); 

  

  router.get(`/checkNit/:nit`, async (req, res) => {
      try {
          const nitToCheck = req.params.nit;
  
          // Verifica si ya existe un documento con el mismo NIT
          const existingDoc = await model.findOne({ nit: nitToCheck });
  
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

  router.get(`/checkNitID/:nit/:id`, async (req, res) => {
    try {
        const nitToCheck = req.params.nit;
        const idToCheck = req.params.id;

        // Verifica si ya existe un documento con el mismo NIT
        const existingDoc = await model.findOne({ nit: nitToCheck });

        if (existingDoc) {
            // Si el documento ya existe
            if (existingDoc.id.toString() === idToCheck.toString()) {
                res.status(200).send({ success: 'El nit está disponible y el ID coincide.' });
            } else {
                // Si el documento ya existe pero el ID es diferente
                res.status(409).send({ error: 'El nit ya existe, pero el ID es diferente.' });
            }
        } else {
            // El nit no existe
            res.status(200).send({ success: 'La cédula está disponible.' });
        }
    } catch (error) {
        console.error('Error al verificar la cédula:', error);
        res.status(500).send({ error: 'Error interno del servidor.' });
    }
});


  
router.get(
    `/${path}`,
    controller.getData
)

router.post(
    `/${path}`,
    controller.insertData,
)

router.put(
    `/${path}/:id`,
    File.fields([{ name: 'boletin' }, { name: 'logo' }]),
    controller.updateSingle
);

router.delete(
    `/${path}/:id`,
    controller.deleteSingle
)

module.exports = router;