const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController'); // Importa el controlador de eventos
 
// Rutas CRUD para eventos
router.get('/', eventosController.getAllEventos); // Obtener todos los eventos
router.get('/:id', eventosController.getEventoById); // Obtener un evento por ID
router.post('/', eventosController.createEvento); // Crear un evento
router.put('/:id', eventosController.updateEvento); // Actualizar un evento por ID
router.delete('/:id', eventosController.deleteEvento); // Eliminar un evento por ID
 
// Ruta para actualizar el cupo disponible de un evento
//router.put('/cupo/:id', eventosController.updateCupoEvento);
 
module.exports = router;