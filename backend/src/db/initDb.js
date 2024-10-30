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
      'DROP TABLE IF EXISTS recoverTokens, ratings, fav, flight, users'
    );

    console.log('Creando tablas...');

    await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) NOT NULL UNIQUE,
                username VARCHAR(100) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                name VARCHAR(100),
                lastName VARCHAR(100),
                avatar TEXT,
                is_admin BOOLEAN DEFAULT FALSE,
                enable BOOLEAN DEFAULT FALSE,
                emailVerificted BOOLEAN DEFAULT FALSE,
                registrationCode VARCHAR(100),
                recoverPassCode VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS fav (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                user_id BIGINT,
                origin TEXT NOT NULL,
                destination TEXT NOT NULL,
                departureDate DATE NOT NULL,
                arrivalDate DATE NOT NULL,
                aeroline TEXT,
                price TEXT ,
                duration TEXT NOT NULL,
                note VARCHAR(250),
                dateOfSaved TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `);

        // esta tabla es para que valoren la web, no para valorar vuelos
    await pool.query(`
            CREATE TABLE IF NOT EXISTS ratings (
                id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                user_id BIGINT,
                rating INT NOT NULL,
                comment VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `);


    console.log('Tablas creadas!');
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
};

initDB();
