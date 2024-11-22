# WonderFly Frontend

Este repositorio contiene el código del frontend de **WonderFly**, una plataforma de planificación de vuelos diseñada para facilitar la experiencia del usuario. Utilizamos tecnologías modernas como **React** y **Tailwind CSS**, y consumimos datos de las APIs de **Amadeus** y **Brevo**.

## Estructura del proyecto

frontend 
├── src
│ ├── assets # Archivos estáticos como imágenes, íconos, etc.
│ ├── components # Componentes reutilizables de la interfaz
│ ├── Context # Proveedores y contextos globales para la aplicación
│ ├── hooks # Custom hooks de React
│ ├── App.jsx # Componente raíz de la aplicación
│ ├── main.jsx # Punto de entrada de la aplicación
| └── package.json


## Requisitos previos

Asegúrate de tener instalado:

- **Node.js**
- **npm**

## Instalación

1. Clona este repositorio en tu máquina local
2. Instala las dependencias del proyecto 

## Configuración

Antes de arrancar la aplicación, asegúrate de configurar las variables de entorno necesarias para interactuar con las APIs de Amadeus y Brevo. Crea un archivo .env en la raíz del proyecto con los siguientes datos:

REACT_APP_AMADEUS_API_KEY=tu_clave_amadeus
REACT_APP_BREVO_API_KEY=tu_clave_brevo

## Uso

Para arrancar el servidor de desarrollo:

npm run dev

Esto abrirá automáticamente la aplicación en tu navegador en la dirección http://localhost:5173 (por defecto).


## Tecnologías utilizadas

React - Biblioteca para construir interfaces de usuario.
Vite - Herramienta de construcción rápida para proyectos web.
Tailwind CSS - Framework CSS para estilos modernos y responsivos.
Amadeus API - Proveedor de datos relacionados con vuelos.
Brevo API - Para gestión de correos electrónicos y notificaciones.

**CONACTO**

Si tienes preguntas o comentarios, no dudes en ponerte en contacto con nosotros en contacto@wonderfly.com.

¡Gracias por contribuir y usar WonderFly! ✈️