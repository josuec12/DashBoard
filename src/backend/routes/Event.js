const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/Events');

router.get('/Event', eventoController.getData);

router.post('/Event', eventoController.createEvent);

router.put('/Event/:id', eventoController.updateEvent);

router.delete('/Event/:id', eventoController.deleteEvent);

router.post('/GetEventByClient', eventoController.getEventsByClient);

module.exports = router;
