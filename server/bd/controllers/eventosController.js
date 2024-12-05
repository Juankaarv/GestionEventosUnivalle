// server/bd/controllers/eventosController.js
const db = require('../../db');

// Obtener todos los eventos
exports.getAllEventos = async (req, res) => {
    try {
        const queryEventos = `
            SELECT 
                E.id AS evento_id,
                E.titulo,
                E.descripcion,
                E.url,
                E.organizadores,
                E.ubicacion,
                E.fecha_hora,
                E.precio_base,
                E.cupo_disponible,
                E.es_evento_virtual,
                E.url_transmision,
                E.plataforma_virtual,
                E.fecha_creacion,
                E.fecha_modificacion,
                E.activo AS evento_activo,
                CE.nombre AS categoria_evento,
                CE.descripcion AS categoria_evento_desc,
                TE.nombre AS tipo_evento,
                TE.descripcion AS tipo_evento_desc,
                COALESCE(E.rutaImagen, 'https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg') AS rutaImagen
            FROM Eventos E
            JOIN CategoriaEventos CE ON E.categoria_evento_id = CE.id
            JOIN TipoEventos TE ON CE.tipo_evento_id = TE.id
            WHERE E.activo = TRUE
        `;
        const [eventos] = await db.query(queryEventos);

        const eventoIds = eventos.map(evento => evento.evento_id);

        // Lógica para tickets y zonas (como está)
        const queryTickets = `
            SELECT 
                TT.evento_id,
                TT.nombre AS tipo_ticket,
                TT.es_de_pago,
                TT.precio,
                TT.fecha_inicio_venta,
                TT.fecha_final_venta
            FROM TipoTickets TT
            WHERE TT.evento_id IN (?)
        `;
        const [tickets] = await db.query(queryTickets, [eventoIds]);

        const queryZonas = `
            SELECT 
                Z.evento_id,
                Z.nombre AS zona,
                Z.capacidad AS zona_capacidad,
                Z.precio_extra AS zona_precio_extra
            FROM Zonas Z
            WHERE Z.evento_id IN (?)
        `;
        const [zonas] = await db.query(queryZonas, [eventoIds]);

        eventos.forEach(evento => {
            evento.tickets = tickets.filter(ticket => ticket.evento_id === evento.evento_id);
            evento.zonas = zonas.filter(zona => zona.evento_id === evento.evento_id);
        });

        res.json(eventos);
    } catch (err) {
        console.error('Error obteniendo los eventos:', err);
        res.status(500).json({ error: 'Error obteniendo los eventos' });
    }
};



exports.getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            SELECT 
                E.id AS evento_id,
                E.titulo,
                E.descripcion,
                E.url,
                E.organizadores,
                E.ubicacion,
                E.fecha_hora,
                E.precio_base,
                E.cupo_disponible,
                E.es_evento_virtual,
                E.url_transmision,
                E.plataforma_virtual,
                E.fecha_creacion,
                E.fecha_modificacion,
                E.activo AS evento_activo,
                CE.nombre AS categoria_evento,
                CE.descripcion AS categoria_evento_desc,
                TE.nombre AS tipo_evento,
                TE.descripcion AS tipo_evento_desc,
                COALESCE(E.rutaImagen, 'https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg') AS rutaImagen,
                TT.nombre AS tipo_ticket,
                TT.es_de_pago,
                TT.precio,
                TT.fecha_inicio_venta,
                TT.fecha_final_venta,
                Z.nombre AS zona,
                Z.capacidad AS zona_capacidad,
                Z.precio_extra AS zona_precio_extra,
                CAST(E.latitud AS CHAR) AS latitude,
                CAST(E.longitud AS CHAR) AS longitude
            FROM Eventos E
            JOIN CategoriaEventos CE ON E.categoria_evento_id = CE.id
            JOIN TipoEventos TE ON CE.tipo_evento_id = TE.id
            LEFT JOIN TipoTickets TT ON E.id = TT.evento_id
            LEFT JOIN Zonas Z ON E.id = Z.evento_id
            WHERE E.id = ? AND E.activo = TRUE
        `;
        const [results] = await db.query(query, [id]);
        if (results.length > 0) {
            const event = results[0];
            event.latitude = parseFloat(event.latitude);
            event.longitude = parseFloat(event.longitude);
            res.json(event);
        } else {
            res.status(404).json({ error: 'Evento no encontrado' });
        }
    } catch (err) {
        console.error('Error obteniendo el evento:', err);
        res.status(500).json({ error: 'Error obteniendo el evento' });
    }
};



exports.createEvento = async (req, res) => {
    console.log('Datos recibidos en el backend:', req.body);
    const {
        categoria_evento_id,
        titulo,
        url,
        descripcion,
        organizadores,
        ubicacion,
        fecha_hora,
        precio_base,
        cupo_disponible,
        es_evento_virtual,
        url_transmision,
        plataforma_virtual,
        latitud,
        longitud,
        rutaImagen,
        importanciaImagen,
        zonas // Array de zonas con información de asientos
    } = req.body;

    // Validación de datos
    if (!categoria_evento_id || !titulo || !fecha_hora || !precio_base || !cupo_disponible) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear el evento.' });
    }

    const connection = await db.getConnection(); // Obtener conexión manual para la transacción

    try {
        await connection.beginTransaction();
 
// Insertar el evento en la tabla `eventos`
const queryEvento = `
    INSERT INTO eventos (
        categoria_evento_id, titulo, url, descripcion, organizadores,
        ubicacion, fecha_hora, precio_base, cupo_disponible,
        es_evento_virtual, url_transmision, plataforma_virtual,
        latitud, longitud, rutaImagen, importanciaImagen
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
const [eventoResult] = await connection.query(queryEvento, [
    categoria_evento_id, titulo, url, descripcion, organizadores,
    ubicacion, fecha_hora, precio_base, cupo_disponible,
    es_evento_virtual, url_transmision, plataforma_virtual,
    latitud, longitud, rutaImagen, importanciaImagen
]);
 
const eventoId = eventoResult.insertId;
 
// Insertar las zonas del evento en la tabla `zonaseventos`
for (const zona of zonas) {
    const queryZona = `
        INSERT INTO zonaseventos (nombre, precio, idEvento, cantidad)
        VALUES (?, ?, ?, ?)
    `;
    const [zonaResult] = await connection.query(queryZona, [
        zona.nombre, zona.precio, eventoId, zona.cantidad
    ]);
    const zonaId = zonaResult.insertId;
 
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
 
    // Insertar los asientos de la zona en la tabla `zonasasientos`
    for (let i = 0; i < zona.cantidad; i++) {
        // Generar código único para el asiento
        const codAsiento = `EVT${eventoId}-ZN${zonaId}-AS${i + 1}-${currentYear}`;
 
        const queryAsiento = `
            INSERT INTO zonasasientos (codAsiento, estado, idZonaEventos)
            VALUES (?, ?, ?)
        `;
        await connection.query(queryAsiento, [codAsiento, 0, zonaId]);
    }
}
 
await connection.commit();
 
res.status(201).json({ message: 'Evento creado con éxito', id: eventoId });
    } catch (error) {
        await connection.rollback();
        console.error('Error creando el evento:', error);

        // Identificar el tipo de error y responder de manera adecuada
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'El evento con los mismos datos ya existe.' });
        }
        res.status(500).json({ error: 'Error creando el evento', details: error.message });
    } finally {
        connection.release(); // Liberar la conexión
    }
};
























// Actualizar evento (actualizar todos los campos excepto el aforo)
exports.updateEvento = async (req, res) => {
    const { 
        categoria_evento_id, 
        titulo, 
        url, 
        descripcion, 
        organizadores, 
        ubicacion, 
        fecha_hora, 
        precio_base, 
        es_evento_virtual, 
        url_transmision, 
        plataforma_virtual, 
        cupo_disponible,
        latitude,
        longitude
    } = req.body;
    
    const { id } = req.params;
    
    try {
        // Actualizar solo los campos del evento
        const queryEvento = `
            UPDATE Eventos SET 
                categoria_evento_id = ?, 
                titulo = ?, 
                url = ?, 
                descripcion = ?, 
                organizadores = ?, 
                ubicacion = ?, 
                fecha_hora = ?, 
                precio_base = ?, 
                es_evento_virtual = ?, 
                url_transmision = ?, 
                plataforma_virtual = ?, 
                cupo_disponible = ?,
                latitud = ?,
                longitud = ?  
            WHERE id = ? AND activo = TRUE
        `;
        const [resultsEvento] = await db.query(queryEvento, [
            categoria_evento_id, 
            titulo, 
            url, 
            descripcion, 
            organizadores, 
            ubicacion, 
            fecha_hora, 
            precio_base, 
            es_evento_virtual, 
            url_transmision, 
            plataforma_virtual, 
            cupo_disponible,
            latitude,
            longitude,  
            id
        ]);

        if (resultsEvento.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento no encontrado o inactivo' });
        }

        res.json({ message: 'Evento actualizado con éxito' });
    } catch (err) {
        console.error('Error actualizando el evento:', err);
        res.status(500).json({ error: 'Error actualizando el evento' });
    }
};



// Marcar evento como inactivo en lugar de eliminarlo
exports.deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'UPDATE Eventos SET activo = FALSE WHERE id = ?';
        const [results] = await db.query(query, [id]);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        res.json({ message: 'Evento marcado como inactivo' });
    } catch (err) {
        console.error('Error marcando el evento como inactivo:', err);
        res.status(500).json({ error: 'Error marcando el evento como inactivo' });
    }
};