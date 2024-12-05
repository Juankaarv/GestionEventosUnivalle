import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
 
const TicketsVendidos = () => {
  const [tickets, setTickets] = useState([]); // Lista de tickets vendidos
  const [eventos, setEventos] = useState([]); // Lista de eventos
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
        console.error('Error al obtener eventos:', error);
        alert(`Error al obtener los eventos: ${error.message}`);
      }
    };
 
    fetchEventos();
  }, []);
 
  // Obtener tickets vendidos por evento
  const fetchTicketsVendidos = async (eventoId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tickets/vendidos/${eventoId}`); // Ruta para obtener tickets vendidos
      if (!response.ok) {
        console.error(`Error en la respuesta: ${response.status} - ${response.statusText}`);
        throw new Error('Error al obtener los tickets vendidos.');
      }
      const data = await response.json();
      setTickets(data); // Actualiza la lista de tickets vendidos
    } catch (error) {
      console.error('Error al obtener tickets vendidos:', error);
      alert(`Error al obtener los tickets vendidos: ${error.message}`);
    }
  };
 
  const handleEventoChange = (e) => {
    const eventoId = e.target.value;
    console.log('ID del evento seleccionado:', eventoId); // Log para verificar el ID del evento seleccionado
    setSelectedEvento(eventoId);
    if (eventoId) {
      fetchTicketsVendidos(eventoId);
    } else {
      setTickets([]);
    }
  };
 
  const exportToPDF = () => {
    const doc = new jsPDF();
 
    // Agregar título al PDF
    doc.setFontSize(16);
    doc.text('Reporte de Tickets Vendidos', 14, 20);
 
    // Configurar las columnas y datos
    const headers = [['Nombre Usuario', 'Correo Usuario', 'Fecha Reserva', 'Estado Reserva', 'Estado Asiento', 'Título Evento']];
    const data = tickets.map((ticket) => [
      ticket.NombreUsuario || 'N/A',
      ticket.CorreoUsuario || 'N/A',
      ticket.FechaReserva ? new Date(ticket.FechaReserva).toLocaleString() : 'N/A',
      ticket.EstadoReserva || 'N/A',
      ticket.EstadoAsiento || 'N/A',
      ticket.TituloEvento || 'N/A',
    ]);
 
    // Generar la tabla en el PDF
    doc.autoTable({
      startY: 30,
      head: headers,
      body: data,
    });
 
    // Guardar el PDF
    doc.save('tickets_vendidos.pdf');
  };
 
  return (
<div>
<h1>Tickets Vendidos</h1>
 
      {/* Botón para exportar a PDF */}
<div>
<button onClick={exportToPDF} disabled={tickets.length === 0}>
          Exportar a PDF
</button>
</div>
 
      {/* Combobox para seleccionar el evento */}
<div>
<label htmlFor="eventoSelect">Selecciona un evento:</label>
<select id="eventoSelect" value={selectedEvento} onChange={handleEventoChange}>
<option value="">-- Selecciona un evento --</option>
          {eventos.map((evento) => (
<option key={evento.id} value={evento.id}>
              {evento.titulo}
</option>
          ))}
</select>
</div>
 
      {/* Tabla para mostrar los tickets vendidos */}
<table border="1" cellPadding="5">
<thead>
<tr>
<th>Nombre Usuario</th>
<th>Correo Usuario</th>
<th>Fecha Reserva</th>
<th>Estado Reserva</th>
<th>Estado Asiento</th>
<th>Título Evento</th>
</tr>
</thead>
<tbody>
          {tickets.map((ticket, index) => (
<tr key={index}>
<td>{ticket.NombreUsuario || 'N/A'}</td>
<td>{ticket.CorreoUsuario || 'N/A'}</td>
<td>
                {ticket.FechaReserva ? new Date(ticket.FechaReserva).toLocaleString() : 'N/A'}
</td>
<td>{ticket.EstadoReserva || 'N/A'}</td>
<td>{ticket.EstadoAsiento || 'N/A'}</td>
<td>{ticket.TituloEvento || 'N/A'}</td>
</tr>
          ))}
</tbody>
</table>
</div>
  );
};
 
export default TicketsVendidos;