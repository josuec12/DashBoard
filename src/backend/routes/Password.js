const express = require('express');
const router = express.Router();
const passwordResetRequestController = require('../controllers/Passwords');

const path = 'Passwords'

router.post(`/${path}`, passwordResetRequestController.requestPasswordReset);
router.get(`/${path}`, passwordResetRequestController.getData);
router.put(`/${path}/:id`, passwordResetRequestController.updateSingle);
router.delete(`/${path}/:id`, passwordResetRequestController.deletePasswordReset);

module.exports = router;