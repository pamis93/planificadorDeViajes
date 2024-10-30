import 'dotenv/config';
import getPool from './getPool.js';

console.log('Variables de entorno cargadas:');
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_HOST: ${process.env.DB_HOST}`);
console.log(`DB_PORT: ${process.env.DB_PORT}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);

const initDB = async () => {
  try {
    let pool = await getPool();

    await pool.query('DROP DATABASE IF EXISTS planificador_vuelos');
    console.log('Eliminando base de datos...');

    console.log('Creando base de datos planificador_vuelos...');
    await pool.query('CREATE DATABASE planificador_vuelos');

    await pool.query('USE planificador_vuelos');

    console.log('Borrando tablas...');
    await pool.query(
      'DROP TABLE IF EXISTS tokens_recuperacion, ratings, favoritos, vuelos, usuarios'
    );

    console.log('Creando tablas...');

    await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) NOT NULL UNIQUE,
                username VARCHAR(100) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                nombre VARCHAR(100),
                apellidos VARCHAR(100),
                avatar TEXT,
                es_administrador BOOLEAN DEFAULT FALSE,
                habilitado BOOLEAN DEFAULT FALSE,
                email_verificado BOOLEAN DEFAULT FALSE,
                registrationCode VARCHAR(100),
                recoverPassCode VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS favoritos (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                usuario_id BIGINT,
                origen TEXT NOT NULL,
                destino TEXT NOT NULL,
                fecha_salida DATE NOT NULL,
                fecha_llegada DATE NOT NULL,
                duracion TEXT NOT NULL,
                nota VARCHAR(250),
                fecha_guardado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
            )
        `);

        // esta tabla es para que valoren la web, no para valorar vuelos
    await pool.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                usuario_id BIGINT,
                rating INT NOT NULL,
                comentario VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
            )
        `);


    console.log('Tablas creadas!');
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
};

initDB();
