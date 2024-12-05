const db = require('../../db');
 
// Obtener todas las Zonas
exports.getAllZonas = async (req, res) => {
  try {
    const [zonas] = await db.query(`
      SELECT
        Zonas.id AS zona_id,
        Zonas.nombre AS zona_nombre,
        Zonas.capacidad,
        Zonas.precio_extra,
        Zonas.descripcion,
        Eventos.titulo AS evento_titulo
      FROM
        Zonas
      JOIN
        Eventos ON Zonas.evento_id = Eventos.id
    `);
 
    res.json(zonas);
  } catch (err) {
    console.error('Error al obtener las zonas:', err);
    res.status(500).json({ error: 'Error al obtener las zonas' });
  }
};
 
// Crear Zona
exports.createZona = async (req, res) => {
  const { nombreZona, zonaCapacidad, zonaPrecioExtra, eventoId, descripcion } = req.body;
 
  if (!eventoId || !nombreZona || !zonaCapacidad || !zonaPrecioExtra) {
    return res.status(400).json({ error: 'Faltan datos requeridos.' });
  }
 
  const capacidad = parseInt(zonaCapacidad, 10);
  const precioExtra = parseFloat(zonaPrecioExtra);
 
  if (isNaN(capacidad) || isNaN(precioExtra)) {
    return res.status(400).json({ error: 'Capacidad o precio extra no son números válidos.' });
  }
 
  try {
    const query = 'INSERT INTO Zonas (nombre, capacidad, precio_extra, evento_id, descripcion) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(query, [nombreZona, capacidad, precioExtra, eventoId, descripcion]);
 
    res.status(201).json({ message: 'Zona creada con éxito', zonaId: result.insertId });
  } catch (err) {
    console.error('Error al crear la zona:', err);
    res.status(500).json({ error: 'Error al crear la zona' });
  }
};
 
// Obtener Zona por ID
exports.getZonaById = async (req, res) => {
  try {
    const [result] = await db.query('SELECT * FROM zonasasientos WHERE id = ?', [req.params.id]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json(result[0]);
  } catch (err) {
    console.error('Error al obtener la zona:', err);
    res.status(500).json({ error: 'Error al obtener la zona' });
  }
};
 
// Actualizar Zona
exports.updateZona = async (req, res) => {
  const { nombre, capacidad, precio_extra } = req.body;
  try {
    const query = 'UPDATE Zonas SET nombre = ?, capacidad = ?, precio_extra = ? WHERE id = ?';
    const [result] = await db.query(query, [nombre, capacidad, precio_extra, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json({ message: 'Zona actualizada con éxito' });
  } catch (err) {
    console.error('Error al actualizar la zona:', err);
    res.status(500).json({ error: 'Error al actualizar la zona' });
  }
};
 
// Eliminar Zona
exports.deleteZona = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Zonas WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json({ message: 'Zona eliminada con éxito' });
  } catch (err) {
    console.error('Error al eliminar la zona:', err);
    res.status(500).json({ error: 'Error al eliminar la zona' });
  }
};
 
// Obtener Zonas por Evento
exports.getZonesByEventId = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT id, nombre, precio, cantidad
      FROM zonaseventos
      WHERE idEvento = ?
    `;
    const [results] = await db.query(query, [id]);
 
    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontraron zonas para este evento.' });
    }
 
    res.json(results);
  } catch (error) {
    console.error('Error al obtener las zonas:', error);
    res.status(500).json({ error: 'Error al obtener las zonas.' });
  }
};
 
// Obtener Asientos por Zona
exports.getAsientosByZona = async (req, res) => {
  const { zonaId } = req.params;
 
  try {
    const query = `
      SELECT codAsiento, estado
      FROM zonasasientos
      WHERE idZonaEventos = ?
    `;
    const [asientos] = await db.query(query, [zonaId]);
 
    if (asientos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron asientos para esta zona.' });
    }
 
    res.json(asientos);
  } catch (err) {
    console.error('Error al obtener asientos:', err);
    res.status(500).json({ error: 'Error al recuperar los asientos.' });
  }
};
 
// Actualizar cantidad de entradas en una zona
/*exports.updateZoneQuantity = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
 
  try {
    const query = 'UPDATE zonaseventos SET cantidad = ? WHERE id = ?';
    const [results] = await db.query(query, [cantidad, id]);
 
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Zona no encontrada o sin entradas disponibles.' });
    }
 
    res.json({ message: 'Cantidad actualizada correctamente.' });
  } catch (err) {
    console.error('Error al actualizar la cantidad:', err);
    res.status(500).json({ error: 'Error al actualizar la cantidad de entradas.' });
  }
};*/
/*
exports.updateZoneQuantity = async (req, res) => {
    const { id } = req.params; // ID de la zona
    const { cantidad } = req.body; // Cantidad de entradas que se quieren comprar
   
    try {
      // Obtener la cantidad actual en la base de datos
      const [[zona]] = await db.query('SELECT cantidad FROM zonaseventos WHERE id = ?', [id]);
   
      if (!zona) {
        return res.status(404).json({ error: 'Zona no encontrada.' });
      }
   
      if (zona.cantidad < cantidad) {
        return res.status(400).json({ error: 'No hay suficientes entradas disponibles.' });
      }
   
      // Restar la cantidad seleccionada
      const nuevaCantidad = zona.cantidad - cantidad;
   
      // Actualizar la cantidad en la base de datos
      const query = 'UPDATE zonaseventos SET cantidad = ? WHERE id = ?';
      const [results] = await db.query(query, [nuevaCantidad, id]);
   
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Zona no encontrada o no se pudo actualizar.' });
      }
   
      res.json({ message: 'Cantidad actualizada correctamente.', nuevaCantidad });
    } catch (err) {
      console.error('Error al actualizar la cantidad:', err);
      res.status(500).json({ error: 'Error al actualizar la cantidad de entradas.' });
    }
  };*/


  const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
 
exports.updateZoneQuantity = async (req, res) => {
  const { id } = req.params; // ID de la zona
  const { cantidad, clientId, eventId } = req.body; // Cantidad, cliente e ID del evento
 
  const connection = await db.getConnection(); // Obtener conexión para transacción
  try {
    await connection.beginTransaction();
 
    // Verificar existencia de los directorios necesarios
    if (!fs.existsSync('qr_codes')) {
      fs.mkdirSync('qr_codes');
    }
 
    if (!fs.existsSync('pdf_tickets')) {
      fs.mkdirSync('pdf_tickets');
    }
 
    // Obtener la cantidad actual de la zona
    const [[zona]] = await connection.query('SELECT cantidad FROM zonaseventos WHERE id = ?', [id]);
 
    if (!zona) {
      throw new Error('Zona no encontrada.');
    }
 
    if (zona.cantidad < cantidad) {
      throw new Error('No hay suficientes entradas disponibles.');
    }
 
    // Restar la cantidad seleccionada
    const nuevaCantidad = zona.cantidad - cantidad;
    await connection.query('UPDATE zonaseventos SET cantidad = ? WHERE id = ?', [nuevaCantidad, id]);
 
    // Insertar en la tabla `reserva`
    const [reservaResult] = await connection.query(
      'INSERT INTO reserva (fecha, estado, idUsuario, idEvent) VALUES (NOW(), "pendiente", ?, ?)',
      [clientId, eventId]
    );
    const reservaId = reservaResult.insertId;
 
    // Obtener los codAsiento existentes en la zona
    const [asientosExistentes] = await connection.query(
      'SELECT codAsiento FROM zonasasientos WHERE idZonaEventos = ?',
      [id]
    );
 
    const asientoReservas = [];
    const asientoIds = [];
    for (let i = 0; i < cantidad; i++) {
      // Obtener el codAsiento del asiento existente (circular en caso de exceder el total)
      const codAsientoExistente = asientosExistentes[i % asientosExistentes.length].codAsiento;
 
      // Generar código único concatenando el codAsiento existente
      const codigoUnico = `ZONE-${id}-RES-${reservaId}`;
      const qrCodePath = `qr_codes/${codigoUnico}.png`;
      const pdfPath = `pdf_tickets/${codigoUnico}.pdf`;
 
      // Crear el código QR
      await QRCode.toFile(qrCodePath, codigoUnico);
 
      // Crear el PDF
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.fontSize(20).text('Entrada de Evento', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text(`Código de Entrada: ${codigoUnico}`, { align: 'center' });
      doc.moveDown();
      doc.image(qrCodePath, { fit: [250, 250], align: 'center', valign: 'center' });
      doc.end();
 
      // Añadir la entrada a `asiento_reserva`
      asientoReservas.push([reservaId, id, 'reservado']);
    }
 
    const [asientoResult] = await connection.query(
      'INSERT INTO asiento_reserva (idReserva, idZonaAsiento, estado) VALUES ?',
      [asientoReservas]
    );
 
    // Obtener los IDs generados para los asientos
    const asientoIdsGenerados = Array.from({ length: asientoReservas.length }, (_, index) => asientoResult.insertId + index);
 
    await connection.commit(); // Confirmar los cambios
 
    res.json({
      message: 'Cantidad actualizada, entradas generadas e inserciones realizadas correctamente.',
      nuevaCantidad,
      reservaId,
      asientoIds: asientoIdsGenerados
    });
  } catch (err) {
    await connection.rollback(); // Revertir los cambios en caso de error
    console.error('Error al realizar la operación:', err);
    res.status(500).json({ error: 'Error al realizar la operación.' });
  } finally {
    connection.release(); // Liberar conexión
  }
};

