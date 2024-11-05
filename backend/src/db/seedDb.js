import 'dotenv/config';
import getPool from './getPool.js';
import bcrypt from 'bcrypt';

// Función para generar usuarios aleatorios
/**
 * Genera una lista de usuarios aleatorios para poblar la base de datos.
 *
 * @param {number} count - Número de usuarios a generar.
 * @returns {Array<Object>} Lista de usuarios con propiedades como email, username, password, etc.
 */
const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      email: `user${i}@example.com`,
      username: `user${i}`,
      password: bcrypt.hashSync('password', 10),
      name: `User ${i}`,
      lastName: `Lastname ${i}`,
      avatar: 'https://via.placeholder.com/150',
      is_admin: i === 0, // El primer usuario será administrador
      enable: true,
      emailVerificted: true,
    });
  }
  return users;
};

// Función para generar vuelos favoritos aleatorios
/**
 * Genera una lista de vuelos favoritos aleatorios para poblar la base de datos.
 *
 * @param {number} userCount - Número de usuarios para los que generar favoritos.
 * @returns {Array<Object>} Lista de vuelos favoritos con propiedades como origin, destination, etc.
 */
const generateFavorites = (userCount) => {
  const favorites = [];
  for (let i = 0; i < userCount; i++) {
    for (let j = 0; j < 3; j++) {
      favorites.push({
        user_id: i + 1,
        origin: `Origin ${j}`,
        destination: `Destination ${j}`,
        departureDate: '2023-05-01',
        arrivalDate: '2023-05-03',
        aeroline: `Airline ${j}`,
        price: `${(Math.random() * 500 + 100).toFixed(2)}`,
        duration: '5h 30m',
        note: `Note ${j}`,
      });
    }
  }
  return favorites;
};

// Función para generar ratings aleatorios
/**
 * Genera una lista de calificaciones aleatorias para poblar la base de datos.
 *
 * @param {number} userCount - Número de usuarios para los que generar calificaciones.
 * @returns {Array<Object>} Lista de calificaciones con propiedades como rating y comment.
 */
const generateRatings = (userCount) => {
  const ratings = [];
  for (let i = 0; i < userCount; i++) {
    ratings.push({
      user_id: i + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: `This is a sample comment ${i}`,
    });
  }
  return ratings;
};

/**
 * Poblador de la base de datos (seeder).
 *
 * Este script elimina los datos existentes en las tablas `ratings`, `fav`, y `users`,
 * y luego inserta datos generados aleatoriamente en dichas tablas.
 *
 * @async
 * @function seedDB
 * @returns {Promise<void>}
 */

const seedDB = async () => {
  try {
    const pool = await getPool();

    // Eliminar datos existentes
    await pool.query('DELETE FROM ratings');
    await pool.query('DELETE FROM fav');
    await pool.query('DELETE FROM users');

    // Insertar usuarios
    const users = generateUsers(20);
    await pool.query(
      'INSERT INTO users (email, username, password, name, lastName, avatar, is_admin, enable, emailVerificted) VALUES ?',
      [
        users.map((u) => [
          u.email,
          u.username,
          u.password,
          u.name,
          u.lastName,
          u.avatar,
          u.is_admin,
          u.enable,
          u.emailVerificted,
        ]),
      ]
    );

    // Insertar vuelos favoritos
    const favorites = generateFavorites(20);
    await pool.query(
      'INSERT INTO fav (user_id, origin, destination, departureDate, arrivalDate, aeroline, price, duration, note) VALUES ?',
      [
        favorites.map((f) => [
          f.user_id,
          f.origin,
          f.destination,
          f.departureDate,
          f.arrivalDate,
          f.aeroline,
          f.price,
          f.duration,
          f.note,
        ]),
      ]
    );

    // Insertar ratings
    const ratings = generateRatings(20);
    await pool.query(
      'INSERT INTO ratings (user_id, rating, comment) VALUES ?',
      [ratings.map((r) => [r.user_id, r.rating, r.comment])]
    );

    console.log('Base de datos poblada correctamente');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
