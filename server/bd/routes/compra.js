const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

// Registrar la compra
router.get('/reservas/:eventoId', compraController.getReservasByEvento);
router.get('/eventos', compraController.getAllEventos);

module.exports = router;
