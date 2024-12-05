import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import ImageSlider from '../components/ImageSlider'; // Importamos el slider
import './Home.css';

import logo from '../img/AlicePark.jpg';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
  const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario
  const [message, setMessage] = useState(''); // Estado para el mensaje del formulario
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el rol del usuario desde el localStorage
    const role = localStorage.getItem('rol');
    setUserRole(role);

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

  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setUserRole(null); // Limpiar el estado del rol
    navigate('/login'); // Redirigir al login
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // Aquí puedes manejar el envío del mensaje, por ejemplo, enviarlo a una API
    console.log('Mensaje enviado:', message);
    setMessage(''); // Limpiar el campo de mensaje
    setShowForm(false); // Cerrar el formulario después de enviar
  };






  
  return (
    <div className="home">
      {/* Slider de imágenes */}
      <ImageSlider images={[
        'https://cc-prod.scene7.com/is/image/CCProdAuthor/concert-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2dG99rerOdMqJd3Zkk6IMg0JV-htvQJjGVg&s',
        'https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/reportajes/cuando-volveremos-a-ir-a-conciertos-con-normalidad/8867610-2-esl-MX/Cuando-volveremos-a-ir-a-conciertos-con-normalidad.png',
      ]} />

      

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

      {/* Botón de cierre de sesión */}
      {userRole && (
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      )}

      {/* Ícono flotante de mensaje */}
      <div
        className="floating-icon"
        onClick={() => setShowForm(!showForm)}
      >
        <i className="fas fa-comment"></i> {/* Ícono de mensaje */}
      </div>

      {/* Formulario de contacto flotante */}
      {showForm && (
        <div className="floating-form">
          <h3>Contáctanos</h3>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="Escribe tu mensaje..."
            rows="4"
          />
          <button onClick={handleSendMessage}>Enviar</button>
          <button onClick={() => setShowForm(false)} type="button">Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Home;
