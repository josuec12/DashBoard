const express = require('express');
const router = express.Router();
const NameEventscontroller = require('../controllers/NameEvents');

router.get('/NameEvent', NameEventscontroller.getData);

router.post('/NameEvent', NameEventscontroller.createNameEvent);

router.put('/NameEvent/:id', NameEventscontroller.updateNameEvent);

router.delete('/NameEvent/:id', NameEventscontroller.deleteNameEvent);

module.exports = router;