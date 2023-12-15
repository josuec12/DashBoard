const express = require('express')
const router = express.Router()
const multer = require('multer');
const controller = require ('../controllers/Besitzs')

const path = 'Besitz'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'File') // La carpeta donde se almacenarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const File = multer({ storage: storage })
  
  router.post(`/${path}`, File.single('boletin'), controller.insertData);

  const model = require('../Models/Besitzss'); 

  router.use('/File', express.static('File'));

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
    controller.updateSingle
)

router.delete(
    `/${path}/:id`,
    controller.deleteSingle
)

module.exports = router;