import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterEvent = ({ setEventData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria_evento_id: 1,
    organizadores: '',
    ubicacion: '', // Campo adicional para ubicación específica
    fecha_hora: '',
    precio_base: '',
    cupo_disponible: '', // Campo para cupo disponible
    es_evento_virtual: false,
    url_transmision: '',
    plataforma_virtual: '',
    latitud: -12.0464, // Latitud por defecto (Lima, Perú)
    longitud: -77.0428, // Longitud por defecto (Lima, Perú)
    rutaImagen: '',
    importanciaImagen: 1,
    zonas: [{ nombre: '', precio: '', cantidad: '' }]
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleZonaChange = (index, e) => {
    const { name, value } = e.target;
    const newZonas = [...formData.zonas];
    newZonas[index] = { ...newZonas[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      zonas: newZonas
    }));
  };

  const addZona = () => {
    setFormData((prevState) => ({
      ...prevState,
      zonas: [...prevState.zonas, { nombre: '', precio: '', cantidad: '' }]
    }));
  };

  const removeZona = (index) => {
    const newZonas = formData.zonas.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      zonas: newZonas
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          rutaImagen: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!formData.titulo || !formData.fecha_hora || !formData.precio_base || !formData.cupo_disponible) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    // Preparar datos
    const eventoData = {
      ...formData,
      categoria_evento_id: parseInt(formData.categoria_evento_id, 10),
      precio_base: parseFloat(formData.precio_base),
      cupo_disponible: parseInt(formData.cupo_disponible, 10),
    };

    console.log('Datos enviados al backend:', eventoData);

    try {
      const response = await fetch('http://localhost:3001/api/eventos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventoData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.error || 'No se pudo registrar el evento.',
        });
        return;
      }

      const result = await response.json();
      console.log('Evento creado:', result);
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Evento registrado correctamente.',
      });
      setEventData(eventoData);
      navigate('/ActiveEvents');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al registrar el evento.',
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Event Information */}
          <div>
            <label className="block mb-2">Titulo de Evento</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Descripcion</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Event Date and Price */}
          <div>
            <label className="block mb-2">Fecha y Hora</label>
            <input
              type="datetime-local"
              name="fecha_hora"
              value={formData.fecha_hora}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Precio Base</label>
            <input
              type="number"
              name="precio_base"
              value={formData.precio_base}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* New Cupo Field */}
          <div>
            <label className="block mb-2">Cupo Disponible</label>
            <input
              type="number"
              name="cupo_disponible"
              value={formData.cupo_disponible}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block mb-2">Direccion Especifica</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Virtual Event Option */}
          <div className="col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="es_evento_virtual"
                checked={formData.es_evento_virtual}
                onChange={handleChange}
                className="mr-2"
              />
              Evento Virtual
            </label>

            {formData.es_evento_virtual && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  name="url_transmision"
                  placeholder="Transmision URL"
                  value={formData.url_transmision}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="plataforma_virtual"
                  placeholder="Plataforma Virtual"
                  value={formData.plataforma_virtual}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>

          {/* Zones and Tickets */}
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">Zona Evento</h2>
            {formData.zonas.map((zona, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre de la Zona"
                  value={zona.nombre}
                  onChange={(e) => handleZonaChange(index, e)}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="precio"
                  placeholder="Precio de la Zona"
                  value={zona.precio}
                  onChange={(e) => handleZonaChange(index, e)}
                  className="p-2 border rounded"
                />
                <div className="flex items-center">
                  <input
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad por zona"
                    value={zona.cantidad}
                    onChange={(e) => handleZonaChange(index, e)}
                    className="p-2 border rounded mr-2"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeZona(index)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Quitar Zona
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addZona}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Añadir Zona
            </button>
          </div>

          {/* Image Upload */}
          
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Crear Evento
        </button>
      </form>
    </div>
  );
};

export default RegisterEvent;