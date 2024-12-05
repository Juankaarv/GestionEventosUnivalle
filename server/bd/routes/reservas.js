const express = require('express');
const router = express.Router();
const reservasController = require('../controllers/reservasController');

// Obtener todas las reservas
router.get('/', reservasController.getAllReservas);

module.exports = router;
