import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../img/LogoUticket.png';
import '../components/Login.css';
 
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos
 
        try {
            const response = await axios.post('http://localhost:3001/api/usuarios/login', {
                correo_electronico: email,
                contrasena: password,
            });
 
            // Guardar token, rol e ID del usuario
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('rol', response.data.rol); // Guardar rol
            sessionStorage.setItem('userId', response.data.id); // Guardar ID del usuario
 
            // Notificación de éxito
            Swal.fire({
                icon: 'success',
                title: '¡Inicio de sesión exitoso!',
                text: `Bienvenido, ${response.data.nombre || 'Usuario'}.`,
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });
 
            // Redirigir según rol
            if (response.data.rol === 1) {
                navigate('/'); // Ruta del administrador
            } else if (response.data.rol === 2) {
                navigate('/SimpleHome'); // Ruta del usuario estándar
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Rol no reconocido',
                    text: 'Consulte con soporte técnico.',
                });
            }
        } catch (error) {
            if (error.response) {
                // Manejar errores del servidor
                if (error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Credenciales incorrectas. Por favor, inténtelo de nuevo.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error del servidor',
                        text: error.response.data?.error || 'Inténtelo más tarde.',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Verifique su red y vuelva a intentarlo.',
                });
            }
        }
    };
 
    return (
<div className="login-background">
<div className="login-container">
<div className="logo-section">
<img src={logo} alt="Logo Utickets" />
</div>
 
                <div className="form-section">
<h2>Bienvenido a <span className="highlight">UTICKET</span></h2>
 
                    <div className="social-login-container">
                    <>
  {/* 
  <button className="social-login google">Login with Google</button>
  <button className="social-login facebook">Login with Facebook</button> 
  */}
</>



</div>
 
                    <form onSubmit={handleLogin}>
<div className="input-container">
<input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
<input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
</div>
 
                        <div className="form-options">
<div className="remember-me">
<input type="checkbox" id="remember-me" />
<label htmlFor="remember-me">Recuérdame</label>
</div>
<Link to="/forgot-password" className="forgot-password">Olvidé mi contraseña</Link>
</div>
 
                        {error && <div className="error">{error}</div>}
 
                        <button type="submit" className="login-button">Ingresar</button>
</form>
 
                    <p className="register-option">
                        ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
</p>
</div>
</div>
</div>
    );
};
 
export default Login;