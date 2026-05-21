const express = require('express');

const { getHealth } = require('../controllers/healthController');

const router = express.Router();

// Endpoint correcto
router.get('/health', getHealth);

module.exports = router;
