import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const handleNavigateToDetails = () => {
        navigate(`/eventDetails/${event.evento_id}`);
    };

    // Manejo de imagen predeterminada
    const handleError = (e) => {
        e.target.src = 'https://img.freepik.com/fotos-premium/fuegos-artificiales-confeti-sobre-multitud-festival-musica_989072-16.jpg';
    };

    return (
        <div className="event-card">
            <img
                src={event.rutaImagen}
                alt={event.titulo}
                className="event-card-image"
                onClick={handleNavigateToDetails}
                onError={handleError} // Imagen predeterminada en caso de error
                style={{ cursor: 'pointer' }}
            />
            <div className="event-card-content">
                <h3>{event.titulo}</h3>
                <p>{event.descripcion}</p>
                <p>
                    <strong>Fecha:</strong> {new Date(event.fecha_hora).toLocaleString()}
                </p>
                <button
                    className="event-card-button"
                    onClick={handleNavigateToDetails}
                    style={{
                        padding: '10px 15px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export default EventCard;
