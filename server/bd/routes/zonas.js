// routes/zonas.js
const express = require('express');
const router = express.Router();
const zonasController = require('../controllers/zonasController'); // Importar el controlador correctamente
const asientosController = require('../controllers/asientosController'); // Asegúrate de que la ruta sea correcta

// Rutas de zonas
router.get('/', zonasController.getAllZonas);             // Obtener todas las zonas
//router.get('/:id', zonasController.getZonaById);          // Obtener zona por ID
router.post('/', zonasController.createZona);             // Crear una nueva zona
//router.put('/:id', zonasController.updateZona);           // Actualizar zona
router.delete('/:id', zonasController.deleteZona);        // Eliminar zona
 



// Ruta para actualizar la cantidad de entradas en una zona
router.put('/:id', zonasController.updateZoneQuantity); // PUT para actualizar cantidad
 
// Ruta para obtener una zona específica por su ID
router.get('/:id', zonasController.getZonaById); // GET para obtener una zona

module.exports = router;

