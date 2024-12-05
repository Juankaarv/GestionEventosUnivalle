const db = require('../../db');  // Conexión a la base de datos

// Obtener reservas y datos relacionados por ID de evento
exports.getReservasByEvento = async (req, res) => {
  const { eventoId } = req.params; // Captura el eventoId de la URL
  try {
      const query = `
          SELECT 
              u.nombres AS NombreUsuario,
              u.correo_electronico AS CorreoUsuario,
              r.fecha AS FechaReserva,
              r.estado AS EstadoReserva,
              ar.estado AS EstadoAsiento,
              e.titulo AS TituloEvento
          FROM 
              reserva r
          JOIN 
              asiento_reserva ar ON r.id = ar.idReserva
          JOIN 
              usuarios u ON r.idUsuario = u.id
          JOIN 
              eventos e ON r.idEvent = e.id
          WHERE 
              e.id = ?
      `;
      const [results] = await db.query(query, [eventoId]);

      if (results.length === 0) {
          return res.status(404).json({ error: 'No se encontraron reservas para este evento.' });
      }

      res.status(200).json(results);
  } catch (error) {
      console.error('Error al obtener reservas:', error);
      res.status(500).json({ error: 'Error al obtener reservas.' });
  }
};


exports.getAllEventos = async (req, res) => {
  try {
      const query = 'SELECT id, titulo FROM eventos';
      const [results] = await db.query(query);
      res.status(200).json(results);
  } catch (error) {
      console.error('Error al obtener los eventos:', error);
      res.status(500).json({ error: 'Error al obtener los eventos.' });
  }
};
