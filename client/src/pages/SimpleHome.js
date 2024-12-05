import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';  // No se necesita Header

import './Home.css';
import logo from '../img/AlicePark.jpg';

const SimpleHome = () => {
  const [events, setEvents] = useState([]);  // Estado para almacenar los eventos
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los eventos
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/eventos');
        const data = await response.json();

        // Agregar una imagen aleatoria a cada evento
        const eventsWithImages = data.map((event) => ({
          ...event,
          image: `https://source.unsplash.com/random/300x200?sig=${event.evento_id}`,
        }));

        setEvents(eventsWithImages);
      } catch (error) {
        console.error('Error al cargar los eventos:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleLogin = () => {
    navigate('/login'); // Redirigir a la página de login
  };

  const handleHome = () => {
    navigate('/'); // Redirigir a la página de inicio
  };




  return (
    <div className="home">
      {/* Aquí no hay Header. Solo el contenido de SimpleHome */}
      
      {/* Banner principal */}
      <section className="main-banner">
        <img src={logo} alt="Fan Fest" className="main-banner-logo" />
        <div className="banner-info">
          <h1>Fan Fest</h1>
          <p>Martes 15 de Octubre, 2024 | 18:00</p>
          <p>Alice Park, Cochabamba</p>
          <button className="cta-button" onClick={handleHome}>Inicio</button>
        </div>
      </section>

      {/* Lista de eventos */}
      <section className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event.evento_id} event={event} />
          ))
        ) : (
          <p>No hay eventos disponibles en este momento.</p>
        )}
      </section>

      {/* Botón de login */}
      <button onClick={handleLogin} className="cta-button">Iniciar sesión</button>
    </div>
  );
};

export default SimpleHome;
