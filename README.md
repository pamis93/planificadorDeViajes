# ✈️ SkyRoutes - Buscador de Vuelos

## Descripción:
 - SkyRoutes es una aplicación web diseñada desde "cero", pensada para que los usuarios encuentren y comparen vuelos de manera rápida y sencilla.
 - Este proyecto es nuestro trabajo final de bootcamp, en el que combinamos todo lo aprendido de desarrollo tanto de frontend como de backend, diseño de bases de datos y uso de APIs.
 - Con SkyRoutes, los usuarios pueden realizar búsquedas detalladas de vuelos,aplicar filtros personalizados, guardar sus vuelos favoritos y acceder a una interfaz clara e intuitiva.

## Objetivo:
- Crear una plataforma accesible y fácil de usar que permita a los usuarios buscar vuelos y gestionar sus favoritos de manera sencilla y segura.

## Características Principales:
  - **Búsqueda Avanzada de Vuelos**: Ofrece filtros personalizados por fechas, precios y escalas para que los usuarios puedan encontrar vuelos específicos que se ajusten a sus necesidades.
  - **Autenticación de Usuarios**: Los usuarios pueden registrarse, iniciar sesión y acceder a sus vuelos guardados.
  - **Guardar Favoritos**: Al marcar vuelos como favoritos, los usuarios pueden acceder rápidamente a ellos en su perfil.

## Base de Datos:
  - MySQL como base de datos para almacenar usuarios, vuelos y favoritos.

## Tecnologías:
- **Frontend**: (React, CSS, etc.)
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **APIs Externas**: Amadeus API

## Herramientas de Desarrollo:
  - Figma para el diseño de interfaz.
  - Postman para probar y validar los endpoints.
  - dotenv para gestionar variables de entorno.
---  
## Estructura de Carpetas:
```plaintext
📦 planificadorDeViajes
├── 📁 backend                  # Backend (Node/Express)
│   └── 📁 src
│       ├── 📁 controllers      # Lógica de negocio
│       ├── 📁 db               # Conexión y modelos de la base de datos
│       ├── 📁 routes           # Rutas de la API
│       ├── 📁 middleware       # Middlewares
│       ├── 📁 models           # Modelos de la base de datos
│       ├── 📁 schemas          # Esquemas de validación
│       ├── 📁 services         # Servicios y lógica adicional
│       ├── 📁 utils            # Utilidades
│       └── server.js           # Archivo principal del servidor
└── README.md
```
---  
## Instalación y Ejecución:
### Pre-requisitos:
  - Node.js
  - MySQL
---  
## Pasos :

##   1. Clona el repositorio
          `git clone https://github.com/pamis93/planificadorDeViajes.git` 
##   2. instala las dependencias para el backend
         - para ir a la carpeta principal `cd backend ` 
         - para instalar todas las dependencias  `npm install ` 
##  3. Configura las variables de entorno:
  - crea un archivo .env en la carpetan "backend" y define las variables necesarias para la conexión a la base de datos y otros servicios.
### Variables para Conexión con la Base de Datos:

  - `DB_HOST=` : Dirección del servidor de la base de datos.

  - `DB_PORT=` : Puerto del servidor de la base de datos.

  - `DB_NAME=` : Nombre de la base de datos.

  - `DB_USER=` : Usuario de la base de datos con permisos de acceso.

  - `DB_PASSWORD=` : Contraseña del usuario de la base de datos.

### Variables de Seguridad:

  - `SECRET=` : Clave secreta para firmar y verificar tokens de autenticación.

### Variables para el Envío de Correos (Brevo):

  - `SMTP_HOST=`: Dirección del servidor SMTP.

  - `SMTP_PORT=`: Puerto del servidor SMTP

  - `SMTP_USER=`: Nombre de usuario o correo electrónico autorizado para enviar correos.

  - `SMTP_PASS=`: Contraseña o clave de acceso para la cuenta SMTP.

  - `SMTP_EMAIL=`: Dirección de correo electrónico desde la cual se enviarán los correos.

### Variables para la API de Amadeus:

  - `AMADEUS_API_KEY=`: Clave de API de Amadeus para acceder a sus servicios de búsqueda de vuelos.

  - `AMADEUS_API_SECRET=`: Clave secreta de la API de Amadeus para autenticar las solicitudes.
---  
## 4. ejecuta la aplicacion:
  - para ir a la carpeta principal  `cd backend` 
  - para arrancar el servidor  `npm run dev` 
---  
# Desarrolado por :
- [Alejandro Garcia](https://github.com/pamis93)
- [Carlos Cue](https://github.com/carloscuepuente)
- [Emanuel Gomez](https://github.com/vascogomez)
- [Lara Rodriguez](https://github.com/larucodonosor)
- [Gustavo Bolivar](https://github.com/GustavoBOG)

