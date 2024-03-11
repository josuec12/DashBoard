const express = require('express');
const controller = require('../controllers/Auths');
const router = express.Router();

router.post('/loginU', controller.loginU);
router.post('/loginA', controller.loginA);
router.get('/auth', controller.getData);

module.exports = router;
