const express = require('express');
const router = express.Router();
const passwordResetRequestController = require('../controllers/Passwords');

router.post('/request', passwordResetRequestController.requestPasswordReset);
router.get('/solicitudes', passwordResetRequestController.getData);

module.exports = router;