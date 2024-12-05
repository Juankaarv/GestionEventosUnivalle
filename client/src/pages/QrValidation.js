import React, { useState } from 'react';
 
const QrValidation = () => {
    const [codigoQR, setCodigoQR] = useState('');
    const [mensaje, setMensaje] = useState(''); // Mantén este estado si lo necesitas para mostrar mensajes
 
    // Función para validar el QR
    const validarQR = async () => {
        if (!codigoQR.trim()) {
            setMensaje('Por favor, ingrese un código QR válido.');
            return;
        }
 
        try {
            const response = await fetch(`http://localhost:3001/api/validar-qr/${codigoQR}`);
            if (!response.ok) {
                throw new Error('El código QR no es válido o no existe.');
            }
 
            const data = await response.json();
            setMensaje(`Código QR válido: ${data.mensaje}`);
        } catch (error) {
            console.error('Error al validar el QR:', error);
            setMensaje('Error al validar el QR. Intente nuevamente.');
        }
    };
 
    return (
<div>
<h1>Validar Código QR</h1>
<input
                type="text"
                placeholder="Ingrese el código QR"
                value={codigoQR}
                onChange={(e) => setCodigoQR(e.target.value)}
            />
<button onClick={validarQR}>Validar QR</button>
            {mensaje && <p>{mensaje}</p>}
</div>
    );
};
 
export default QrValidation;