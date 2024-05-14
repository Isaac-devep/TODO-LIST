# Todo App

Este proyecto es una aplicación de lista de tareas (todo app) que incluye un backend desarrollado en Node.js con Express y una base de datos MySQL, junto con un frontend en React Native.

## Estructura del Proyecto

El proyecto está dividido en tres directorios principales:

- `backend`: Contiene el código fuente del servidor Node.js.
- `frontend`: Contiene el código fuente de la aplicación React Native.
- `database`: Contiene los scripts SQL para la creación de la base de datos y las tablas necesarias.

### Backend

El backend proporciona una API RESTful para interactuar con la base de datos MySQL. Maneja operaciones CRUD para las tareas.

### Frontend

El frontend es una aplicación móvil desarrollada en React Native que permite a los usuarios gestionar sus tareas.

### Database

Este directorio contiene el script `schema.sql` que se utiliza para crear la estructura de la base de datos necesaria para la aplicación.

## Pre-requisitos

Antes de iniciar, asegúrate de tener instalado lo siguiente:

- Node.js (v14 o superior)
- MySQL (v8 o superior)
- React Native CLI (ver [Setting up the development environment](https://reactnative.dev/docs/environment-setup))

## Configuración del Proyecto

### Clonar el Repositorio
## Configuración del Backend

### Navega al directorio backend:
cd backend

### Instala las dependencias:
npm install

Crea un archivo .env en el directorio backend basado en el ejemplo .env.example proporcionado. Asegúrate de modificar los valores de las variables de entorno según tu entorno local.

Configuración del Frontend

### Navega al directorio frontend:

cd frontend

### Instala las dependencias:

npm install

### Configuración de la Base de Datos
Inicia sesión en tu servidor MySQL y crea una nueva base de datos:

CREATE DATABASE todo_db;

## Ejecuta el script schema.sql ubicado en el directorio database para crear las tablas necesarias:

mysql -u username -p todo_db < database/schema.sql

Ejecución del Proyecto
Iniciar el Servidor Backend
Desde el directorio backend, ejecuta:
npm start
### Iniciar la Aplicación React Native
Desde el directorio frontend, ejecuta:
npm start
