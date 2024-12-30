# RollingPaws - Rest API

## Este proyecto fue creado como parte del trabajo final presentado en el curso de desarrollo web fullstack de RollingCode School (https://web.rollingcodeschool.com/).

# Como usarlo

## Esta REST API se diseñó para gestionar la administración de pacientes, los servicios ofrecidos y la reserva de turnos en una veterinaria. Los usuarios pueden registrarse e iniciar sesión para cargar, modificar y eliminar información de sus mascotas, así como gestionar sus turnos en la veterinaria.

# Roles

## La API maneja dos roles para los usuarios: "user" y "admin". En los casos en donde se necesite proteger las rutas, un middleware pide un token generado por la herramienta Jason Web Token (https://jwt.io/). 

# Base de datos

## La información se guarda en una base de datos de MongoDB. La API opera con 6 colecciones diferentes:

1. users
2. pets
3. appointments
4. doctors
5. services
6. messages

# USUARIOS

## GET

* /users: Permite al usuario con rol de administrador obtener todos los usuarios registrados en la base de datos.
* /users/:userID: Permite al usuario con rol de administrador obtener la información del usuario con el userID en la base de datos.
* /users/self: Permite al usuario con rol de usuario obtener su información de la base de datos.

## POST

* /users: Permite que un usuario ingrese al sistema proporcionando un email y contraseña validos para un usuario registrado. Devuelve token y rol de usuario

## PUT

* /register: Permite registrar un usuario nuevo al sistema. Se deben proporcionar los siguientes datos obligatorios para guardar el usuario en la base de datos:

* firstName: Puede contener caracteres del alfabeto español (ñ y acentos), una apostrofe ('), un mínimo de 2 caracteres y hasta 40 caracteres.
* lastName: Puede contener caracteres del alfabeto español (ñ y acentos), una apostrofe ('), un mínimo de 2 caracteres y hasta 40 caracteres.
* email: Formato de email válido (ej. anon@anon.com)
* password: La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial (@$!%*?&).

* /profile-pic/:userID : Permite agregar una foto de perfil al usuario con userID. El archivo debe ser de formato .jpg o .png y se sube a un servicio para guardar imagenes en la nube (https://cloudinary.com/home).

## POST

* /:userID: Permite al usuario (user o admin) modificar su información.

* /change-password-token: Permite a cualquiera que reciba el email de recuperación de contraseña con un token válido, el cual se envia por header, cambiar su contraseña.

* /change-password: Permite al usuario cambiar su contraseña

* /forgot-password: Si el email proporcionado corresponde a un usuario registrado, envía un email, usando el servicio de nodemailer (https://www.nodemailer.com/), con un token para poder restablecer la contraseña.

* /logout: Permite al usuario terminar la sesión.

* /ban-user/:userID: Permite al usuario con rol de administrador, deshabilitar al usuario con el userID proporcionado.

# DELETE

* /:userID: Permite al usuario con rol de administrador eliminar al usuario con userID de la base de datos.