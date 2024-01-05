const express = require('express');
const controller = require('../controllers/Auths');
const router = express.Router();

router.post('/loginU', controller.loginU);
router.post('/loginA', controller.loginA);


module.exports = router;
