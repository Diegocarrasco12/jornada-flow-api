const express = require('express');

const {
  getJornadas,
  createJornada,
} = require('../controllers/jornadasController');

const router = express.Router();

router.get('/', getJornadas);

router.post('/', createJornada);

module.exports = router;
