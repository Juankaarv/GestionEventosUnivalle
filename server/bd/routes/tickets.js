// routes/ticketsRoutes.js
const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

// Definir las rutas para el CRUD de tickets
router.get('/', ticketsController.getAllTickets);
router.get('/:id', ticketsController.getTicketById);
router.post('/', ticketsController.createTicket);
router.put('/:id', ticketsController.updateTicket);
router.delete('/:id', ticketsController.deleteTicket);


router.get('/reservas/:eventoId', ticketsController.getReservasByEvento);

router.get('/eventos', ticketsController.getAllEventos);

router.get('/vendidos/:eventoId', ticketsController.getVendidosByEvento);

router.put('/reserva/:id', ticketsController.updateReserva);

module.exports = router;
