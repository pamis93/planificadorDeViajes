// importamos el server
import server from './src/server.js';

// port donde va a escuchar de forma condicional
// asi la escribe en el servidor de producción o toma el puerto 3001 para trabajar en local
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening in port ${PORT}`);
});
