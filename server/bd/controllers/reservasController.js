const db = require('../../db');

// Obtener todas las reservas con los asientos relacionados
exports.getAllReservas = async (req, res) => {
    try {
        const query = `
            SELECT
                r.id AS reservaId,
                r.fecha,
                r.estado AS estadoReserva,
                r.idUsuario,
                r.idEvent,
                ar.id AS asientoId,
                ar.estado AS estadoAsiento,
                ar.idZonaAsiento
            FROM reserva r
            LEFT JOIN asiento_reserva ar ON r.id = ar.idReserva
        `;

        const [results] = await db.query(query);
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ error: 'Error al obtener las reservas.' });
    }
};