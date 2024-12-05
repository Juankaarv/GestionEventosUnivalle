import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import '../pages/ActiveEvents.css';
import Swal from 'sweetalert2';
import { Eye, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
 
const EventTable = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/eventos');
          const data = await response.json();
          setEvents(data);
        } catch (error) {
          console.error('Error al cargar los eventos:', error);
          Swal.fire('Error', 'No se pudieron cargar los eventos', 'error');
        }
      };
      fetchEvents();
    }, []);
   
    const handleViewEvent = (eventId) => {
      navigate(`/eventDetailsAdmin/${eventId}`);
    };
   
    const handleEditEvent = (eventId) => {
      navigate(`/editEvent/${eventId}`);
    };
   
    const handleDeleteEvent = async (eventId) => {
      const { isConfirmed } = await Swal.fire({
        title: '¿Eliminar evento?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#3b82f6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });
   
      if (isConfirmed) {
        try {
          const response = await fetch(`http://localhost:3001/api/eventos/${eventId}`, {
            method: 'DELETE',
          });
   
          if (response.ok) {
            setEvents(events.filter((event) => event.evento_id !== eventId));
            Swal.fire('¡Eliminado!', 'El evento ha sido eliminado.', 'success');
          } else {
            Swal.fire('Error', 'No se pudo eliminar el evento', 'error');
          }
        } catch (error) {
          console.error('Error al eliminar el evento:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar', 'error');
        }
      }
    };
   
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
   
    return (
      <div className="container mx-auto px-4 py-6">

        <button
                onClick={() => navigate('/RegisterEvent')}
                style={{
                  marginBottom: '20px',
                  padding: '10px 20px',
                  backgroundColor: '#A86666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Crear Evento
              </button>

        {events.length === 0 ? (
          <div className="bg-gray-100 rounded-xl p-8 text-center max-w-md mx-auto">
            <p className="text-gray-600 text-lg font-medium">
              No hay eventos disponibles
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Parece que aún no se han creado eventos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.evento_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {event.titulo}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {event.descripcion}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {formatDate(event.fecha_hora)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {event.ubicacion || 'No especificada'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => handleViewEvent(event.evento_id)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-full transition-colors"
                          title="Ver evento"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEditEvent(event.evento_id)}
                          className="text-green-500 hover:text-green-700 hover:bg-green-50 p-2 rounded-full transition-colors"
                          title="Editar evento"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.evento_id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                          title="Eliminar evento"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };
   
  export default EventTable;
