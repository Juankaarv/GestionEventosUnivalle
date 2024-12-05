import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SimpleHome from './pages/SimpleHome';
import Layout from './components/Layout';
import Header from './components/Header';
import About from './pages/About';
import Eventos from './pages/Eventos';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import RegisterEvent from './pages/RegisterEvent';
import RegisterEventDetails from './pages/RegisterEventDetails';
import ActiveEvents from './pages/ActiveEvents';
import EditEvent from './pages/EditEvent';
import NewTicket from './pages/NewTicket';
import TipoTicketsList from './pages/TipoTicketsList';
import EditTicket from './pages/EditTicket';
import EventRegistration from './pages/EventRegistration';
import EditTipoTicket from './pages/EditTipoTicket';
import Zonas from './pages/Zonas';
import ZonasList from './pages/ZonasList';
import ZonasEdit from './pages/ZonasEdit';
import Asientos from './pages/Asientos';
import AsientosCreate from './pages/AsientosCreate';
import AsientoEdit from './pages/AsientoEdit';
import EventoSelect from './pages/EventoSelect';
import CheckPago from './pages/CheckPago';
import ZonaEntrada from './pages/ZonaEntrada';
import MetodoPago from './pages/MetodoPago';
import EventDetails from './pages/EventDetails';
import EventDetailsAdmin from './pages/EventDetailsAdmin';
import { AuthProvider } from './context/AuthContext';
import Swal from 'sweetalert2';
import Reservas from './pages/Reservas';
import SelectedSeats from './pages/SelectedSeats';
import QrValidation from './pages/QrValidation'; // Importar el componente para validar QR
import QrValidatorPage from './pages/QrValidatorPage';
import TicketsVendidos from './pages/TicketsVendidos';
import Usuarios from './pages/Usuarios';

const App = () => {
  const [eventData, setEventData] = useState({});
 
  return (
<Router>
<AuthProvider>
<Routes>
          {/* Ruta específica sin Layout ni Header */}
<Route path="/SimpleHome" element={<SimpleHome />} />
 
          {/* Todas las demás rutas con Header y Layout */}
<Route path="*" element={<AppRoutes eventData={eventData} setEventData={setEventData} />} />
</Routes>
</AuthProvider>
</Router>
  );
};
 
const AppRoutes = ({ eventData, setEventData }) => {
  const location = useLocation(); // Obtener la ruta actual
 
  // Lista de rutas donde NO debe mostrarse el Header
  const noHeaderRoutes = ['/login', '/register', '/forgot-password'];
 
  const isNoHeaderRoute = noHeaderRoutes.includes(location.pathname);
 
  // Manejo global del evento para notificaciones (opcional)
  const handleEventCreationSuccess = (message) => {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message || 'El evento se ha registrado correctamente.',
      confirmButtonText: 'Aceptar',
    });
  };
 
  return (
<>
      {/* Mostrar Header solo si la ruta NO está en la lista de exclusión */}
      {!isNoHeaderRoute && <Header />}
 
      {/* Envolver las rutas principales dentro del Layout */}
<Layout>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/about" element={<About />} />
<Route path="/eventos" element={<Eventos />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route
            path="/RegisterEvent"
            element={<RegisterEvent setEventData={setEventData} />}
          />
<Route
            path="/RegisterEventDetails"
            element={<RegisterEventDetails eventData={eventData} />}
          />
<Route path="/activeEvents" element={<ActiveEvents />} />
<Route path="/editEvent/:eventId" element={<EditEvent />} />
<Route path="/newTicket" element={<NewTicket />} />
<Route path="/editTicket/:id" element={<EditTicket />} />
<Route path="/eventRegistration" element={<EventRegistration />} />
<Route path="/reservas" element={<Reservas />} />
<Route path="/tipotickets/:id" element={<EditTipoTicket />} />
<Route path="/zonas" element={<Zonas />} />
<Route path="/zonasList" element={<ZonasList />} />
<Route path="/zonasEdit/:id" element={<ZonasEdit />} />
<Route path="/asientos" element={<Asientos />} />
<Route path="/asientosCreate" element={<AsientosCreate />} />
<Route path="/asientoEdit/:id" element={<AsientoEdit />} />
<Route path="/eventoSelect" element={<EventoSelect />} />
<Route path="/zonaEntrada/:id" element={<ZonaEntrada />} />
<Route path="/metodo-pago/:zonaId" element={<MetodoPago />} />
<Route path="/checkPago" element={<CheckPago />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/eventDetails/:eventId" element={<EventDetails />} />
<Route path="/zonas/asientos/:idZonaEventos" element={<SelectedSeats />} />

<Route path="/qrValidatorPage" element={<QrValidatorPage />} />
<Route path="/tickets-vendidos" element={<TicketsVendidos />} />
<Route path="/usuarios" element={<Usuarios />} />

<Route path="/eventDetailsAdmin/:eventId" element={<EventDetailsAdmin />} />
          {/* Ruta para validar QR */}
<Route path="/validar-qr" element={<QrValidation />} />
 
          {/* Ruta para actualizar cantidad de entradas en zonas */}
<Route
            path="/zonas/:id"
            element={<ZonasEdit />} // Asegúrate de tener un componente o página para manejar esta ruta
          />
</Routes>
</Layout>
</>
  );
};
 
export default App;