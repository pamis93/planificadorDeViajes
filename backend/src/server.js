import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';



// Creamos el servidor.
const server = express();

// Middleware de peticiones entrantes.
server.use(morgan('dev'));

// Middleware conexión entre cliente y servidor.
server.use(cors());

// Middleware parseo del body en formato JSON
server.use(express.json());

//Middleware para upload de files

server.use(fileUpload());

//Middleware para definición directorio recursos estáticos (imágenes)

server.use('/uploads', express.static('./uploads'));

// Middleware de manejo de errores.
server.use((err, req, res, next) => {
    
  res.status(err.httpStatus || 500).send({
      status: 'error',
      message: err.message,
  });

});

// Middleware 404 not found.

server.use((req, res) => {
  res.status(404).send({
      status: 'error',
      message: 'Ruta no encontrada',
  });
});

export default server;
