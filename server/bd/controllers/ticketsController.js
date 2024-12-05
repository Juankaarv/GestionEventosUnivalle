const db = require('../../db');

// Obtener todos los tickets activos con nombre del evento
exports.getAllTickets = async (req, res) => {
    try {
        const query = `
            SELECT TipoTickets.*, Eventos.titulo AS evento_titulo 
            FROM TipoTickets 
            LEFT JOIN Eventos ON TipoTickets.evento_id = Eventos.id 
            WHERE TipoTickets.activo = TRUE
        `;
        const [results] = await db.query(query);
        res.json(results); // Devuelve todos los tickets activos con el nombre del evento
    } catch (err) {
        console.error('Error obteniendo los tickets:', err);
        res.status(500).json({ error: 'Error al obtener la lista de tickets activos.' });
    }
};







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
  









// Obtener ticket por ID si está activo, incluyendo nombre del evento
exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT z.id, z.nombre, z.precio
            FROM zonaseventos z
            JOIN eventos e
            ON e.id = z.idEvento
            WHERE e.id = ?
        `;
        const [results] = await db.query(query, [id]);
 
        if (!results || results.length === 0) {
            return res.status(404).json([]);
        }
 
        res.json(results); // Devuelve un array con las zonas
    } catch (err) {
        console.error('Error obteniendo las zonas:', err);
        res.status(500).json({ error: 'Error al obtener las zonas.' });
    }
};















// Obtener tickets vendidos por ID de evento
exports.getVendidosByEvento = async (req, res) => {
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
                e.id = ? AND r.estado = 'asistido'
        `;
        const [results] = await db.query(query, [eventoId]);
 
        if (results.length === 0) {
            return res.status(404).json({ error: 'No se encontraron tickets vendidos para este evento.' });
        }
 
        res.status(200).json(results);
    } catch (error) {
        console.error('Error al obtener tickets vendidos:', error);
        res.status(500).json({ error: 'Error al obtener tickets vendidos.' });
    }
};





















// Crear nuevo ticket
exports.createTicket = async (req, res) => {
    const { nombreTicket, tipoPago, precio, limiteCompra, stock, fechaInicioVenta, fechaFinalVenta, tipoCierre, eventoId } = req.body;
    
    try {
        const query = `
            INSERT INTO TipoTickets 
            (nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [results] = await db.query(query, [
            nombreTicket,
            tipoPago === 'Pago',
            precio,
            limiteCompra,
            stock,
            fechaInicioVenta,
            fechaFinalVenta,
            tipoCierre === 'Por fecha y hora',
            eventoId
        ]);
        res.status(201).json({ message: 'El ticket ha sido creado exitosamente.', id: results.insertId });
    } catch (err) {
        console.error('Error creando el ticket:', err);
        res.status(500).json({ error: 'Hubo un problema al crear el ticket.' });
    }
};

// Actualizar ticket
exports.updateTicket = async (req, res) => {
    const { nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id } = req.body;
    const { id } = req.params;
    try {
        const query = `
            UPDATE TipoTickets SET 
            nombre = ?, 
            es_de_pago = ?, 
            precio = ?, 
            limite_compra = ?, 
            stock = ?, 
            fecha_inicio_venta = ?, 
            fecha_final_venta = ?, 
            es_por_fecha = ?, 
            evento_id = ? 
            WHERE id = ? AND activo = TRUE
        `;
        
        const [results] = await db.query(query, [
            nombre, es_de_pago, precio, limite_compra, stock, fecha_inicio_venta, fecha_final_venta, es_por_fecha, evento_id, id
        ]);
        
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado o inactivo para actualización.' });
        }
        
        res.json({ message: 'El ticket ha sido actualizado exitosamente.' });
    } catch (err) {
        console.error('Error actualizando el ticket:', err);
        res.status(500).json({ error: 'Hubo un problema al actualizar el ticket.' });
    }
};

// Marcar ticket como inactivo
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE TipoTickets SET activo = FALSE WHERE id = ?';
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Ticket no encontrado para desactivación.' });
        }
        res.json({ message: 'El ticket ha sido marcado como inactivo.' });
    } catch (err) {
        console.error('Error marcando el ticket como inactivo:', err);
        res.status(500).json({ error: 'Hubo un problema al marcar el ticket como inactivo.' });
    }
};


// Actualizar el estado de una reserva a "asistido"
exports.updateReserva = async (req, res) => {
    const { id } = req.params; // ID de la reserva
    try {
        const query = `
            UPDATE reserva
            SET estado = 'asistido'
            WHERE id = ?
        `;
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada para actualización.' });
        }
        res.json({ message: 'El estado de la reserva ha sido actualizado a "asistido" exitosamente.' });
    } catch (err) {
        console.error('Error actualizando la reserva:', err);
        res.status(500).json({ error: 'Hubo un problema al actualizar la reserva.' });
    }
};