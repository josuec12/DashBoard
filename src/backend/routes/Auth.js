const express = require('express');
const controller = require('../controllers/Auths');
const router = express.Router();

router.post('/loginU', controller.loginU);
router.post('/loginA', controller.loginA);

// router.post('/validateToken', controller.validateToken);
// router.post('/validateTokenAdmin', controller.validateTokenAdmin);

module.exports = router;
