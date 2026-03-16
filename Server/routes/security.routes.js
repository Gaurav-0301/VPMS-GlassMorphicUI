const express = require('express');
const router = express.Router();
const { securityCheck,updateMovement } = require('../controllers/security.checks');


router.get('/securitycheck/:refId', securityCheck);
router.put('/visitor/movement/:refId', updateMovement);

module.exports = router;