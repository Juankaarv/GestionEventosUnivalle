import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../pages/eventDetails.css';
 
const EventDetails = () => {
    const { eventId } = useParams(); // Obtener el ID del evento desde los parámetros de la URL
    const [event, setEvent] = useState(null);
    const [zones, setZones] = useState([]); // Guardar las zonas (tipos de entrada)
    const [tickets, setTickets] = useState('');
    const [zone, setZone] = useState('');
    const [price, setPrice] = useState(0);
 
    // Obtener detalles del evento
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`);
                const data = await response.json();
                setEvent(data);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar los detalles del evento. Por favor, intenta más tarde.',
                });
            }
        };
 
        fetchEventDetails();
    }, [eventId]);
 
    // Obtener las zonas (tipos de entradas) desde el backend usando `getTicketById`
    useEffect(() => {
        const fetchZones = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/tickets/${eventId}`);
                const data = await response.json();
                setZones(data); // Guardar las zonas recibidas
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al cargar las zonas. Por favor, intenta más tarde.',
                });
            }
        };
 
        fetchZones();
    }, [eventId]);
 
    const handleZoneChange = (e) => {
        const selectedZone = e.target.value;
        setZone(selectedZone);
 
        // Buscar el precio de la zona seleccionada
        const selectedZoneData = zones.find((zone) => zone.nombre === selectedZone);
        setPrice(selectedZoneData ? selectedZoneData.precio : 0);
    };
 
    const handlePurchase = async () => {
        if (!tickets || !zone) {
            Swal.fire({
                icon: 'warning',
                title: 'Faltan datos',
                text: 'Por favor, selecciona la cantidad de entradas y la zona.',
            });
            return;
        }
 
        const selectedZone = zones.find((z) => z.nombre === zone); // Buscar la zona seleccionada
        if (!selectedZone) {
            Swal.fire({
                icon: 'error',
                title: 'Zona no válida',
                text: 'La zona seleccionada no es válida.',
            });
            return;
        }
 
        // Obtener el ID del cliente desde sessionStorage
        const clientId = sessionStorage.getItem('userId');
        if (!clientId) {
            Swal.fire({
                icon: 'error',
                title: 'Error de sesión',
                text: 'Para comprar tienes que iniciar sesion antes.',
            });
            return;
        }
 
        // Continuar con la compra
        try {
            const response = await fetch(`http://localhost:3001/api/zonas/${selectedZone.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cantidad: tickets, clientId, eventId }), // Enviar el ID del cliente
            });
 
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar la cantidad.');
            }
 
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Compra realizada',
                text: `Compra realizada con éxito. Entradas restantes: ${data.nuevaCantidad}`,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al realizar la compra: ${error.message}`,
            });
        }
    };
 
    const handleImageError = (e) => {
        e.target.src = 'https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg';
    };
 
    if (!event) {
        return <p>Cargando detalles del evento...</p>;
    }
 
    return (
<div className="event-details-container">
<h2 className="event-title">{event.titulo}</h2>
<img
                src={event.rutaImagen.startsWith('http') ? event.rutaImagen : `/${event.rutaImagen}`}
                alt={event.titulo}
                className="event-image"
                onError={handleImageError}
            />
<p className="event-description">{event.descripcion}</p>
<p className="event-detail"><strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}</p>
<p className="event-detail"><strong>Lugar:</strong> {event.ubicacion || 'No especificado'}</p>
<p className="event-detail"><strong>Organizador:</strong> {event.organizadores || 'Desconocido'}</p>
<p className="event-detail"><strong>Capacidad:</strong> {event.cupo_disponible || 'No especificado'}</p>
<p className="event-detail"><strong>Categoría:</strong> {event.categoria_evento || 'Sin categoría'}</p>
 
            <div className="ticket-options">
<div className="ticket-option">
<label htmlFor="ticketQuantity">Cantidad de entradas:</label>
<select
                        id="ticketQuantity"
                        value={tickets}
                        onChange={(e) => setTickets(e.target.value)}
>
<option value="">Seleccione cantidad</option>
                        {[...Array(10)].map((_, i) => (
<option key={i + 1} value={i + 1}>
                                {i + 1}
</option>
                        ))}
</select>
</div>
<div className="ticket-option">
<label htmlFor="ticketType">Zona:</label>
<select
                        id="ticketType"
                        value={zone}
                        onChange={handleZoneChange}
>
<option value="">Seleccione una zona</option>
                        {zones.map((zone) => (
<option key={zone.id} value={zone.nombre}>
                                {zone.nombre} - ${zone.precio}
</option>
                        ))}
</select>
</div>
</div>
 
            {tickets && zone && (
<div className="ticket-total">
<p><strong>Total:</strong> ${price * tickets}</p>
</div>
            )}
 
            <button
                className="btn-purchase"
                onClick={handlePurchase}
                disabled={!tickets || !zone}
>
                Comprar entradas
</button>
</div>
    );
};
 
export default EventDetails;