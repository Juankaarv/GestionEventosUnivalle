import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../pages/EditEvent.css';
import Swal from 'sweetalert2';

const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState({
        titulo: '',
        descripcion: '',
        fecha_hora: '',
        ubicacion: '',
        categoria_evento_id: '',
        url: '',
        organizadores: '',
        precio_base: '',
        es_evento_virtual: false,
        url_transmision: '',
        plataforma_virtual: '',
        cupo_disponible: '',
        latitude: '',
        longitude: '',
    });
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const pinRef = useRef(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`);
                const data = await response.json();
                setEvent({ ...data });
            } catch (error) {
                console.error('Error al cargar el evento:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEvent({
            ...event,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        const formattedFechaHora = new Date(event.fecha_hora).toISOString().slice(0, 19).replace('T', ' ');
        const updatedEvent = {
            ...event,
            fecha_hora: formattedFechaHora,
        };

        if (!updatedEvent.categoria_evento_id) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La categoría del evento es obligatoria.',
                confirmButtonText: 'Aceptar',
                customClass: {
                    container: 'my-swal-container',
                    popup: 'my-swal-popup'
                }
            });
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Evento actualizado',
                    text: 'El evento se ha actualizado exitosamente.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup'
                    }
                });
                navigate('/ActiveEvents');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al actualizar el evento.',
                    confirmButtonText: 'Aceptar',
                    customClass: {
                        container: 'my-swal-container',
                        popup: 'my-swal-popup'
                    }
                });
            }
        } catch (error) {
            console.error('Error al actualizar el evento:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el evento.',
                confirmButtonText: 'Aceptar',
                customClass: {
                    container: 'my-swal-container',
                    popup: 'my-swal-popup'
                }
            });
        }
    };

    const formattedDate = event.fecha_hora ? new Date(event.fecha_hora).toISOString().slice(0, 16) : '';

    return (
        <div className="edit-event">
            <h2>Editar Evento</h2>
            <form onSubmit={handleSave}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={event.titulo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={event.descripcion}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Fecha y Hora:
                    <input
                        type="datetime-local"
                        name="fecha_hora"
                        value={formattedDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                

                {/* Mostrar las coordenadas debajo del mapa */}
                <div>
                    <p><strong>Latitud:</strong> {event.latitude || 'No seleccionada'}</p>
                    <p><strong>Longitud:</strong> {event.longitude || 'No seleccionada'}</p>
                </div>

                <label>
                    Categoría del Evento:
                    <select
                        name="categoria_evento_id"
                        value={event.categoria_evento_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="button-row">
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={() => navigate('/ActiveEvents')}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
