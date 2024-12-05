/*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QRPage = () => {
  const { eventId, ticketId } = useParams(); // Obtener los parámetros de la URL
  const [qrCode, setQrCode] = useState(null); // Guardar el QR
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`/api/eventos/${eventId}/tickets/${ticketId}/qr`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setQrCode(data.qrImageUrl || data.qrData); // Ajustar según lo que devuelva el backend
      } catch (err) {
        console.error('Error obteniendo el QR:', err);
        setError('No se pudo cargar el código QR. Inténtalo de nuevo.');
      }
    };

    fetchQRCode();
  }, [eventId, ticketId]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : qrCode ? (
        <img
          src={qrCode}
          alt="Código QR"
          style={{ width: '300px', height: '300px', margin: 'auto' }}
        />
      ) : (
        <p>Cargando código QR...</p>
      )}
    </div>
  );
};

export default QRPage;
*/
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QRPage = () => {
  const { eventId } = useParams(); // Ahora solo usamos el ID del evento
  const [qrCode, setQrCode] = useState(null); // Guardar el QR
  const [error, setError] = useState(null); // Manejar errores

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`/api/eventos/${eventId}/qr`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setQrCode(data.qrImageUrl); // Ajusta según el dato devuelto por el backend
      } catch (err) {
        console.error('Error obteniendo el QR:', err);
        setError('No se pudo cargar el código QR. Inténtalo de nuevo.');
      }
    };

    fetchQRCode();
  }, [eventId]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : qrCode ? (
        <img
          src={qrCode}
          alt="Código QR"
          style={{ width: '300px', height: '300px', margin: 'auto' }}
        />
      ) : (
        <p>Cargando código QR...</p>
      )}
    </div>
  );
};

export default QRPage;
