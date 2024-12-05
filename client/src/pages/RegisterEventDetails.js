import React, { useState } from 'react';
import '../components/RegisterEventDetails.css';
 
const RegisterEventDetails = ({ eventData }) => {
    const [formData, setFormData] = useState({
        fechaInicio: '',
        horaInicio: '',
        fechaFin: '',
        horaFin: '',
        aperturaPuertas: '',
        nombreLugar: '',
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            // Validar los campos obligatorios
            if (!formData.fechaInicio || !formData.horaInicio || !formData.fechaFin || !formData.horaFin || !formData.nombreLugar) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }
 
            // Crear la fecha y hora de inicio combinadas
            const fechaHoraInicio = new Date(`${formData.fechaInicio}T${formData.horaInicio}`);
            const fechaHoraFin = new Date(`${formData.fechaFin}T${formData.horaFin}`);
 
            // Validar que las fechas sean válidas
            if (isNaN(fechaHoraInicio.getTime()) || isNaN(fechaHoraFin.getTime())) {
                alert('Las fechas y horas ingresadas no son válidas.');
                return;
            }
 
            // Validar que la fecha de fin sea posterior a la fecha de inicio
            if (fechaHoraFin <= fechaHoraInicio) {
                alert('La fecha de fin debe ser posterior a la fecha de inicio.');
                return;
            }
 
            // Crear la apertura de puertas (si es proporcionada)
            let aperturaPuertas = null;
            if (formData.aperturaPuertas) {
                aperturaPuertas = new Date();
                const [hours, minutes] = formData.aperturaPuertas.split(':');
                aperturaPuertas.setHours(hours, minutes, 0, 0);
            }
 
            // Preparar los datos a enviar al backend
            const eventDetails = {
                ...eventData, // Datos del evento enviados previamente
                fecha_hora_inicio: fechaHoraInicio.toISOString(), // Convertir a formato ISO
                fecha_hora_fin: fechaHoraFin.toISOString(), // Convertir a formato ISO
                apertura_puertas: aperturaPuertas ? aperturaPuertas.toISOString() : null,
                nombre_lugar: formData.nombreLugar,
            };
 
            console.log('Enviando datos al backend:', eventDetails);
 
            // Realizar la solicitud al backend
            const response = await fetch('http://localhost:3001/api/eventos/detalles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventDetails),
            });
 
            const data = await response.json();
            if (response.ok) {
                alert('Evento creado con éxito');
            } else {
                console.error('Error al guardar los detalles del evento:', data);
                alert(data.error || 'Error al guardar los detalles del evento.');
            }
        } catch (error) {
            console.error('Error al enviar los datos al backend:', error);
            alert('Hubo un error al guardar los detalles del evento.');
        }
    };
 
    return (
<form className="register-event-details-form" onSubmit={handleSubmit}>
<h2>Detalles del Evento</h2>
<p>Ingresa la información detallada de tu evento.</p>
 
            <div className="fecha-section">
<h3>Fecha</h3>
<div className="fecha-fields">
<div>
<label>Fecha y hora de inicio del evento</label>
<input
                            type="date"
                            name="fechaInicio"
                            value={formData.fechaInicio}
                            onChange={handleChange}
                            required
                        />
<input
                            type="time"
                            name="horaInicio"
                            value={formData.horaInicio}
                            onChange={handleChange}
                            required
                        />
</div>
<div>
<label>Fecha y hora de fin del evento</label>
<input
                            type="date"
                            name="fechaFin"
                            value={formData.fechaFin}
                            onChange={handleChange}
                            required
                        />
<input
                            type="time"
                            name="horaFin"
                            value={formData.horaFin}
                            onChange={handleChange}
                            required
                        />
</div>
<div>
<label>Apertura de puertas</label>
<input
                            type="time"
                            name="aperturaPuertas"
                            value={formData.aperturaPuertas}
                            onChange={handleChange}
                        />
</div>
</div>
</div>
 
            <div className="lugar-section">
<h3>Lugar</h3>
<input
                    type="text"
                    name="nombreLugar"
                    placeholder="Nombre del lugar"
                    value={formData.nombreLugar}
                    onChange={handleChange}
                    required
                />
</div>
<button type="submit">Guardar Evento</button>
</form>
    );
};
 
export default RegisterEventDetails;