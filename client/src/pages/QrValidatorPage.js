import { QrReader } from '@blackbox-vision/react-qr-reader';
import React, { useState } from 'react';

const QrValidatorPage = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  // Función para extraer el ID de reserva del código QR
  const extractReservaId = (qrCode) => {
    const segments = qrCode.split('-');
    return segments[segments.length - 1]; // Obtiene el último segmento
  };

  // Función para actualizar la reserva
  const updateReserva = async (reservaId) => {
    reservaId = reservaId.trim(); // Eliminar espacios adicionales

    try {
      const response = await fetch(`http://localhost:3001/api/tickets/reserva/${reservaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Error al actualizar la reserva.');
        setStatus('');
        return;
      }

      const data = await response.json();
      setStatus(data.message);
      setError('');
    } catch (err) {
      console.error('Error al consumir la API:', err);
      setError('Error de red o respuesta inválida del servidor.');
      setStatus('');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
      <h1>Validador de Código QR</h1>
      <p>Escanea el QR con la cámara</p>

      {/* Mostrar mensajes antes del lector de QR */}
      {result && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Resultado del QR:</h3>
          <p style={{ color: 'green', wordWrap: 'break-word' }}>ID de Reserva: {result}</p>
        </div>
      )}

      {status && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Estado:</h3>
          <p style={{ color: 'blue' }}>{status}</p>
        </div>
      )}

      {error && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Error:</h3>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      )}

      {/* Lector de QR */}
      <QrReader
        onResult={(scanResult, scanError) => {
          if (scanResult) {
            const qrCodeText = scanResult?.text;
            const reservaId = extractReservaId(qrCodeText); // Extrae el ID de la reserva
            console.log('QR escaneado:', qrCodeText); // Log para verificar el QR completo
            console.log('ID de reserva extraído:', reservaId); // Log para verificar el ID extraído
            setResult(reservaId);
            setError('');
            setStatus('Validando...');
            updateReserva(reservaId); // Llama a la API con el ID de la reserva
          }
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QrValidatorPage;
