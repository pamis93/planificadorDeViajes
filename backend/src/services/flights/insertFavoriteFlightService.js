import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const insertFavoriteFlightService = async (
  origin,
  destination,
  departureDate,
  arrivalDate,
  aeroline,
  price,
  duration,
  note,
  user_id
) => {
  const pool = await getPool();

  // Verificar si el vuelo ya existe en favoritos para el usuario actual
  const [existingFavorite] = await pool.query(
    `SELECT id FROM fav 
    WHERE user_id = ? AND origin = ? AND destination = ? 
    AND departureDate = ? AND arrivalDate = ? AND aeroline = ? AND price = ? AND duration = ? AND note = ?`,
    [user_id, origin, destination, departureDate, arrivalDate, aeroline, price, duration, note]
  );

  if (existingFavorite.length > 0) {
    throw generateErrorsUtils('El vuelo ya está en favoritos', 409);
  }

  // Insertar el vuelo en la tabla de favoritos
  const [result] = await pool.query(
    `INSERT INTO fav 
      (user_id, origin, destination, departureDate, arrivalDate, aeroline, price, duration, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, origin, destination, departureDate, arrivalDate, aeroline, price, duration, note]
  );

  const { insertId } = result;

  // Obtener el vuelo favorito recién añadido para retornar
  const [favorite] = await pool.query(`SELECT * FROM fav WHERE id = ?`, [
    insertId,
  ]);

  return favorite[0];
};

export default insertFavoriteFlightService;
