### ✈️ FlightMate - Buscador de Vuelos
---
## Descripción:
  FlightMate es una aplicación web diseñada desde "cero", pensada para que los usuarios encuentren y comparen vuelos de manera rápida y sencilla.
  Este proyecto es nuestro trabajo final de bootcamp, en el que combinamos todo lo aprendido de desarrollo tanto de frontend como de backend, diseño de bases de datos y uso de APIs.

  Con FlightMate, los usuarios pueden realizar búsquedas detalladas de vuelos,aplicar filtros personalizados, guardar sus vuelos favoritos y acceder a una interfaz clara e intuitiva.
---
## Objetivo:
  Crear una plataforma accesible y fácil de usar que permita a los usuarios buscar vuelos y gestionar sus favoritos de manera sencilla y segura.
---
## Características Principales:
  - Búsqueda avanzada de vuelos: Ofrece filtros personalizados por fechas, precios y escalas.
  - Autenticación de usuarios: Los usuarios pueden registrarse, iniciar sesión y acceder a sus vuelos guardados.
  - Guardar favoritos: Los usuarios pueden marcar vuelos como favoritos para tener un acceso rápido a ellos.
---
## Base de Datos:
  - MySQL como base de datos para almacenar usuarios, vuelos y favoritos.
---
## Herramientas de Desarrollo:
  - Figma para el diseño de interfaz.
  - Postman para probar y validar los endpoints.
  - dotenv para gestionar variables de entorno.
---  
## Estructura de Carpetas:
📦 planificadorDeViajes
		├── 📁 backend			# Backend (Node/Express)
		│   └── 📁 src
		│   	├── 📁 controllers     	# Lógica de negocio
		│   	├── 📁 db		            # Conexión y modelos de la base de datos
		│   	├── 📁 routes         	# Rutas de la API
		│   	├── 📁 middleware     	# Middlewares
		│   	├── 📁 models         	# 
		│   	├── 📁 schemas    	    # Esquemas de validación    	
		│   	├── 📁 services		      # Servicios y lógica adicional
		│   	├── 📁 utils		        # Utilidades
		│   	└── server.js	         	# Archivo principal del servidor     	
		└── README.md

## Instalación y Ejecución

   # Pre-requisitos
    - Node.js
    - MySQL

  # Pasos :

        - 1. Clona el repositorio
        ```git clone https://github.com/pamis93/planificadorDeViajes.git```
        - 2. instala las dependencias para el backend
        ```cd backend ```
        ```npm install ```
        - 3. Configura las variables de entorno:
          crea un archivo .env en la carpetan "backend" y define las variables necesarias para la conexión a la base de datos y otros servicios.
          ```
              DB_HOST=
              DB_PORT=
              DB_NAME=
              DB_USER=
              DB_PASSWORD=
          ```
        - 4 ejecuta la aplicacion:
            ```
              cd backend
              npm run dev 
            ```


## Desarrolado por :
- Alejandro Garcia
- Carlos Cue
- Emanuel Gomez
- Lara Rodriguez
- Jose de la Flor
- Gustavo Bolivar