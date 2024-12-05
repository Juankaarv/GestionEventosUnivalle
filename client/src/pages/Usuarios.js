import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    contrasena: '',
    carnet: '',
    numero_celular: '',
    rol_id: 2, // Usuario estándar por defecto
  });
  const [editingUser, setEditingUser] = useState(null);

  // Obtener todos los usuarios al cargar
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener la lista de usuarios.',
      });
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Crear o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombres || !formData.correo_electronico || !formData.carnet || !formData.numero_celular) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    try {
      if (editingUser) {
        await axios.put(`http://localhost:3001/api/usuarios/${editingUser.id}`, formData);
        Swal.fire('Actualizado', 'Usuario actualizado exitosamente', 'success');
      } else {
        await axios.post('http://localhost:3001/api/usuarios', formData);
        Swal.fire('Creado', 'Usuario creado exitosamente', 'success');
      }
      setEditingUser(null);
      setFormData({
        nombres: '',
        apellidos: '',
        correo_electronico: '',
        contrasena: '',
        carnet: '',
        numero_celular: '',
        rol_id: 2,
      });
      fetchUsuarios();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Error al procesar la solicitud.',
      });
    }
  };

  // Editar usuario
  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setFormData({
      ...usuario,
      contrasena: '', // No mostramos la contraseña existente
    });
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Eliminar usuario?',
      text: 'Esta acción no puede deshacerse.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/api/usuarios/${id}`);
          Swal.fire('Eliminado', 'Usuario eliminado exitosamente', 'success');
          fetchUsuarios();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el usuario.',
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          placeholder="Nombres"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
          className="p-2 border rounded"
        />
        <input
          type="email"
          name="correo_electronico"
          value={formData.correo_electronico}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          placeholder="Contraseña"
          className="p-2 border rounded"
          required={!editingUser}
        />
        <input
          type="text"
          name="carnet"
          value={formData.carnet}
          onChange={handleChange}
          placeholder="Carnet"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="numero_celular"
          value={formData.numero_celular}
          onChange={handleChange}
          placeholder="Número de Celular"
          className="p-2 border rounded"
          required
        />
        <select
          name="rol_id"
          value={formData.rol_id}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value={1}>Administrador</option>
          <option value={2}>Usuario</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
          {editingUser ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </form>

      {/* Tabla */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Nombres</th>
            <th className="border p-2">Apellidos</th>
            <th className="border p-2">Correo</th>
            <th className="border p-2">Carnet</th>
            <th className="border p-2">Celular</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td className="border p-2">{usuario.nombres}</td>
              <td className="border p-2">{usuario.apellidos}</td>
              <td className="border p-2">{usuario.correo_electronico}</td>
              <td className="border p-2">{usuario.carnet}</td>
              <td className="border p-2">{usuario.numero_celular}</td>
              <td className="border p-2">{usuario.rol_id === 1 ? 'Administrador' : 'Usuario'}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(usuario)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(usuario.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
