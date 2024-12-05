const db = require('../../db');  // Conexión a la base de datos

// Controlador para validar el código QR
exports.validateQrCode = async (req, res) => {
    const { codigo } = req.body; // Recibimos el código QR desde el cliente
    try {
        // Validar el código en la base de datos
        const query = `SELECT * FROM reservas WHERE codigo_unico = ?`;
        const [results] = await db.query(query, [codigo]);
 
        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Código QR no válido o no encontrado.' });
        }
 
        // Si el código es válido, devolvemos información adicional
        res.status(200).json({ 
            mensaje: 'Código QR válido.',
            reserva: results[0] // Opcional: devolver detalles de la reserva
        });
    } catch (error) {
        console.error('Error al validar el código QR:', error);
        res.status(500).json({ error: 'Error al validar el código QR.' });
    }
};