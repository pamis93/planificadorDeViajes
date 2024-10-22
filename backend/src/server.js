import express from 'express';
import morgan from 'morgan';


// Creamos el servidor.
const server = express();

// Middleware de peticiones entrantes.
app.use(morgan('dev'));

// Middleware conexión entre cliente y servidor.
app.use(cors());

// Middleware parseo del body en formato JSON
app.use(express.json());

// Middleware de manejo de errores.
app.use((err, req, res, next) => {
    
  res.status(err.httpStatus || 500).send({
      status: 'error',
      message: err.message,
  });

});

// Middleware 404 not found.

app.use((req, res) => {
  res.status(404).send({
      status: 'error',
      message: 'Ruta no encontrada',
  });
});

export default server;
