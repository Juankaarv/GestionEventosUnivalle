const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
 
// Ruta para validar el QR
router.post('/validar-qr', qrController.validateQrCode);
 
module.exports = router;