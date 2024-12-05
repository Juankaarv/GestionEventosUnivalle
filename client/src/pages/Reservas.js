import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
 
const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [eventos, setEventos] = useState([]); // Lista de eventos para el combobox
  const [selectedEvento, setSelectedEvento] = useState(''); // Evento seleccionado
 
  // Obtener la lista de eventos al cargar el componente
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/eventos'); // Cambia a la ruta correcta de tu backend para obtener eventos
 
        if (!response.ok) {
          console.error(`Error en la respuesta: ${response.status} - ${response.statusText}`);
          throw new Error('Error al obtener los eventos.');
        }
 
        const data = await response.json();
        setEventos(data); // Actualiza la lista de eventos
      } catch (error) {
        console.error('Error en fetch:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error al obtener los eventos: ${error.message}`,
        });
      }
    };
 
    fetchEventos();
  }, []);
 
  // Obtener reservas según el evento seleccionado
  const fetchReservas = async (eventoId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/reservas/${eventoId}`);
 
      if (!response.ok) {
        console.error(`Error en la respuesta: ${response.status} - ${response.statusText}`);
        throw new Error('Error al obtener las reservas.');
      }
 
      const data = await response.json();
      setReservas(data); // Actualiza las reservas
    } catch (error) {
      console.error('Error en fetch:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `No hay Reservas de este evento`,
      });
    }
  };
 
  const handleEventoChange = (e) => {
    const eventoId = e.target.value;
 
    console.log('ID del evento seleccionado:', eventoId); // Verifica el valor capturado
 
    setSelectedEvento(eventoId);
 
    if (eventoId) {
      fetchReservas(eventoId);
    } else {
      setReservas([]);
    }
  };
 
  const exportToPDF = () => {
    const doc = new jsPDF();
 
    // Agregar título al PDF
    doc.setFontSize(16);
    doc.text('Reporte de Reservas', 14, 20);
 
    // Configurar las columnas y datos
    const headers = [
      ['Nombre Usuario', 'Correo Usuario', 'Fecha Reserva', 'Estado Reserva', 'Estado Asiento', 'Título Evento'],
    ];
 
    const data = reservas.map((reserva) => [
      reserva.NombreUsuario || 'N/A',
      reserva.CorreoUsuario || 'N/A',
      reserva.FechaReserva ? new Date(reserva.FechaReserva).toLocaleString() : 'N/A',
      reserva.EstadoReserva || 'N/A',
      reserva.EstadoAsiento || 'N/A',
      reserva.TituloEvento || 'N/A',
    ]);
 
    // Generar la tabla en el PDF
    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
    });
 
    // Guardar el PDF
    doc.save('reservas.pdf');
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'El reporte de reservas se ha exportado correctamente.',
    });
  };
 
  return (
<div>
<h1>Reservas</h1>
 
      {/* Botón para exportar en PDF */}
<div>
<button onClick={exportToPDF} disabled={reservas.length === 0}>
          Exportar a PDF
</button>
</div>
 
      {/* Combobox para seleccionar el evento */}
<div>
<label htmlFor="eventoSelect">Selecciona un evento:</label>
<select id="eventoSelect" value={selectedEvento} onChange={handleEventoChange}>
<option value="">-- Selecciona un evento --</option>
          {eventos.map((evento) => (
<option key={evento.evento_id} value={evento.evento_id}>
              {evento.titulo}
</option>
          ))}
</select>
</div>
 
      {/* Tabla de reservas */}
<table border="1" cellPadding="5">
<thead>
<tr>
<th>Nombre Usuario</th>
<th>Correo Usuario</th>
<th>Fecha Reserva</th>
<th>asistido al evento</th>
<th>Estado Asiento</th>
<th>Título Evento</th>
</tr>
</thead>
<tbody>
          {reservas.map((reserva, index) => (
<tr key={index}>
<td>{reserva.NombreUsuario || 'N/A'}</td>
<td>{reserva.CorreoUsuario || 'N/A'}</td>
<td>
                {reserva.FechaReserva ? new Date(reserva.FechaReserva).toLocaleString() : 'N/A'}
</td>
<td>{reserva.EstadoReserva || 'N/A'}</td>
<td>{reserva.EstadoAsiento || 'N/A'}</td>
<td>{reserva.TituloEvento || 'N/A'}</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
};
 
export default Reservas;