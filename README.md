
### La rest API se encuentra subida a: https://rollingpaws-back.vercel.app/

# RollingPaws - Rest API

Este repositorio contiene el backend para RollingPaw, una REST API desarrollada con Node.js, Express, y MongoDB. La API gestiona las funcionalidades relacionadas con la administración de pacientes, turnos, y servicios de una veterinaria.

Este proyecto fue creado como parte del trabajo final presentado en el curso de desarrollo web fullstack de RollingCode School (https://web.rollingcodeschool.com/).

Desarrollador: Fernando F. Salomón (https://github.com/fernandosalomon).

## Características

- **CRUD de Pacientes:** Gestión completa de los datos de los pacientes y sus dueños.
- **CRUD de Turnos:** Creación, consulta, actualización y eliminación de turnos asignados a veterinarios.
- **CRUD de Servicios:** Administración de los servicios ofrecidos por la veterinaria.
- **Autenticación Segura:** Login para administrador con contraseñas encriptadas mediante bcrypt.
- **Protección de rutas:** Implementación de dos roles de usuario con privilegios diferenciados. Los accesos y permisos se controlan mediante tokens generados con JSON Web Token (JWT), asegurando que las rutas restringidas sean accesibles solo para usuarios autorizados.
- **Notificaciones:** Envío automático de correos electrónicos usando NodeMailer.

## Requerimientos

- **Node.js** (versión 14 o superior).
- **MongoDB** (local o en la nube).
- Librerías utilizadas:
  - `express`
  - `mongoose`
  - `bcryptjs`
  - `cloudinary`
  - `jsonwebtoken`
  - `nodemailer`

## Configuración e Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/fernandosalomon/rollingpaws-back
cd rollingpaws-back
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en el directorio raíz con el siguiente contenido:

```env
PORT=3001
MONGO_CONNECT=<URL_DE_TU_BASE_DE_DATOS>
JWT_SECRET=<CLAVE_SECRETA>
GMAIL_USER=<USUARIO_EMAIL>
GMAIL_PASS=<CONTRASEÑA_EMAIL>
CLOUD_NAME=<<CLOUDINARY_CLOUD_NAME>
CLOUD_API_KEY=<CLOUDINARY_API_KEY>
CLOUD_API_SECRET=<CLOUDINARY_API_SECRET>
```

### 4. Ejecutar el servidor
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001` por defecto.

### 5. Publicación del proyecto
- **Frontend:** https://rollingpaws-front.vercel.app/
- **Backend:** https://rollingpaws-back.vercel.app/ 

## Endpoints

### Usuarios
- **GET** `/api/user` - Obtener todos los usuario.
- **GET** `/api/user/:id` - Obtener información de un usuario por ID.
- **GET** `/api/user/self` - Obtener usuario autenticado.
- **POST** `/api/user/` - Iniciar sesión
- **POST** `/api/user/register` - Registrar nuevo usuario
- **PUT** `/api/user/:id` - Actualizar un usuario.
- **PUT** `/api/user/ban-user/:id` - Deshabilitar un usuario por ID.
- **PUT** `/api/user/change-password` - Cambiar contraseña de un usuario.
- **PUT** `/api/user/logout` - Cerrar sesión de un usuario.
- **PUT** `/api/user/profile-pic/:id` - Cambiar imagen de perfil de un usuario.
- **DELETE** `/api/user/:id` - Eliminar un usuario.

### Mascotas
- **GET** `/api/pet` - Obtener todos las mascotas.
- **GET** `/api/pet/:id` - Obtener información de una mascotas por ID.
- **GET** `/api/pet/user` - Obtener todas laa mascotas del usuario autenticado.
- **POST** `/api/pet` - Crear una nueva mascotas.
- **PUT** `/api/pet/:id` - Actualizar una mascota por ID.
- **PUT** `/api/pet/image/:id` - Actualizar imagen de una mascota por ID.
- **DELETE** `/api/pet/:id` - Eliminar una mascotas.

### Turnos
- **GET** `/api/appointments` - Obtener todos los turnos.
- **GET** `/api/appointments/:id` - Obtener información de un turno por ID.
- **GET** `/api/appointments/user/` - Obtener todos los turnos del usuario autenticado.
- **POST** `/api/appointments` - Crear un nuevo turno.
- **PUT** `/api/appointments/:id` - Actualizar un turno.
- **DELETE** `/api/appointments/:id` - Eliminar un turno.

### Servicios
- **GET** `/api/servicios` - Obtener todos los servicios.
- **GET** `/api/servicios/:id` - Obtener información de un servicio por ID.
- **POST** `/api/servicios` - Crear un nuevo servicio.
- **PUT** `/api/servicios/:id` - Actualizar un servicio.
- **PUT** `/api/servicios/image/:id` - Actualizar imagen de un servicio por ID.
- **DELETE** `/api/servicios/:id` - Eliminar un servicio.

### Mensajes
- **GET** `/api/messages` - Obtener todos los mensajes.
- **POST** `/api/messages` - Crear un nuevo mensaje.
- **PUT** `/api/messages/:id` - Marcar un mensaje como leido.

### Veterinarios
- **GET** `/api/doctor` - Obtener todos los veterinarios.
- **GET** `/api/doctor/:id` - Obtener información de un veterinario por ID.
- **GET** `/api/doctor/clinic-hours/:id&:date` - Obtener los horarios libres del veterinario por ID en una fecha determinada.
- **POST** `/api/doctor` - Crear un nuevo veterinario.
- **PUT** `/api/doctor/:id` - Actualizar un veterinario por ID.
- **DELETE** `/api/doctor/:id` - Eliminar un veterinario.

### Recuperación de contraseña
- **PUT** `/api/user/forgot-password` - Enviar mail de cambio de contraseña.
- **PUT** `/api/user/change-password-token` - Cambiar contraseña utilizando el token enviado al email.

## Estructura del Proyecto

```
rollingvet-backend/
├── controllers/
│   ├── appointments.controller.js
│   ├── doctor.controller.js
│   ├── messages.controller.js
│   ├── pet.controller.js
│   ├── services.controller.js
│   └── user.controller.js
├── db/
│   └── db.config.js
├── helpers/
│   ├── cloudinary.config.js
│   ├── mail.template.js
│   └── nodemailer.config.js
├── middlewares/
│   ├── auth.js
│   └── multer.js
├── models/
│   ├── appointments.model.js
│   ├── doctor.model.js
│   ├── messages.model.js
│   ├── pet.model.js
│   ├── services.model.js
│   └── user.model.js
├── routes/
│   ├── appointments.routes.js
│   ├── doctor.routes.js
│   ├── messages.routes.js
│   ├── pet.routes.js
│   ├── services.routes.js
│   └── user.routes.js
├── server/
│   └── server.config.js
├── utils/
│   ├── appointments.services.js
│   ├── doctor.services.js
│   ├── messages.services.js
│   ├── pet.services.js
│   ├── services.services.js
│   └── user.services.js
├── index.js
├── package.json
└── README.md
```

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza tus cambios y haz commit:
    ```bash
    git commit -m "Agrega nueva funcionalidad"
    ```
4. Envía los cambios a tu repositorio remoto:
    ```bash
    git push origin feature/nueva-funcionalidad
    ```
5. Crea un Pull Request en el repositorio principal.

## Licencia

Este proyecto está bajo la Licencia MIT.