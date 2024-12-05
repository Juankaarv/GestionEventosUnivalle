import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
 
const SelectedSeats = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const zoneId = params.get('zoneId');
    const tickets = parseInt(params.get('tickets'), 10);
 
    const [seats, setSeats] = useState([]);
 
    // Obtener los asientos disponibles
    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/zonasasientos?zoneId=${zoneId}&limit=${tickets}`);
                const data = await response.json();
                setSeats(data);
            } catch (error) {
                console.error('Error al cargar los asientos:', error);
            }
        };
 
        fetchSeats();
    }, [zoneId, tickets]);
 
    if (!seats.length) {
        return <p>Cargando asientos seleccionados...</p>;
    }
 
    return (
<div className="selected-seats-container">
<h2>Asientos Seleccionados</h2>
<ul>
                {seats.map((seat) => (
<li key={seat.codAsiento}>Asiento: {seat.codAsiento}</li>
                ))}
</ul>
</div>
    );
};
 
export default SelectedSeats;