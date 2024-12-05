# Sistema de Gestión de Eventos Univalle

## **Descripción del Proyecto**

Este sistema permite gestionar eventos, reservas y usuarios de manera eficiente. Ofrece funcionalidades para crear eventos con zonas, gestionar reservas con códigos QR, y validar la asistencia de los usuarios en tiempo real.

### **Características Principales**
1. **Gestión de Eventos**:
   - Crear eventos con zonas y definir el número de asientos disponibles por cada zona.
2. **Gestión de Usuarios**:
   - Registrar usuarios y asignar roles (Administrador o Cliente).
3. **Reservas**:
   - Realizar reservas seleccionando la zona y número de asientos.
   - Generar un código QR único para cada reserva.
4. **Validación de QR**:
   - Escanear el código QR con una cámara para validar la entrada al evento.
   - Cambiar automáticamente el estado de la reserva de "Pendiente" a "Asistido".
5. **Reportes**:
   - Generar reportes en formato PDF sobre reservas y asistentes.

---

## **Instalación**

1. **Clonar el Repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd gestion-eventos
   ```

2. **Instalar Dependencias**:
   Ejecuta los siguientes comandos para instalar las librerías necesarias:
   ```bash
   npm install bcrypt
   npm install dotenv
   npm install nodemailer
   npm install sweetalert2
   npm install qrcode
   npm install axios
   npm install multer
   npm install bootstrap
   npm install @blackbox-vision/react-qr-reader --legacy-peer-deps
   npm install react-bootstrap bootstrap
   npm install pdfkit
   npm install somepackage
   npm install lucide-react
   npm install html5-qrcode
   npm install jspdf jspdf-autotable
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:
   ```env
   DB_HOST=localhost
   DB_USER=usuario
   DB_PASSWORD=contraseña
   DB_NAME=nombre_base_datos
   ```

4. **Iniciar el Servidor**:
   Ejecuta el comando:
   ```bash
   npm run dev
   ```

---

## **Estructura del Proyecto**

### **Backend**
1. **Endpoints Principales**:
   - `POST /eventos`: Crear un nuevo evento con sus zonas y asientos.
   - `POST /reservas`: Crear una reserva y generar el código QR.
   - `GET /reservas/:qr`: Validar la reserva mediante el código QR.
   - `GET /usuarios`: Listar usuarios.
   - `POST /usuarios`: Registrar nuevos usuarios.

2. **Funcionalidades**:
   - **Autenticación**: Contraseñas cifradas con `bcrypt`.
   - **Correos**: Notificaciones por correo utilizando `nodemailer`.
   - **Generación de QR**: Crear códigos QR con `qrcode`.

### **Frontend**
1. **Componentes Principales**:
   - **Gestión de Eventos**:
     - Formulario para crear eventos y zonas.
     - Tabla para administrar eventos.
   - **Reservas**:
     - Formulario para seleccionar zona y asientos.
     - Generación de códigos QR.
   - **Validación de QR**:
     - Escáner de QR implementado con `@blackbox-vision/react-qr-reader` o `html5-qrcode`.
   - **Reportes**:
     - Generación de PDFs con `jspdf` y `jspdf-autotable`.

2. **Diseño**:
   - Interfaz desarrollada con `react-bootstrap` y `bootstrap`.
   - Notificaciones dinámicas con `sweetalert2`.

3. **Gestión de Estado**:
   - Consumo de APIs con `axios`.

---

## **Flujo del Sistema**

1. **Creación de Eventos**:
   - El administrador define las zonas y asigna los asientos disponibles por cada zona.

2. **Reservas**:
   - Los usuarios seleccionan un evento, una zona y el número de asientos deseados.
   - Se genera un código QR asociado a la reserva.

3. **Validación de Asistencia**:
   - En el evento, el administrador escanea el QR del usuario.
   - Si la reserva es válida, se actualiza su estado.
