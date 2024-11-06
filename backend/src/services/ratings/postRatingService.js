import getPool from '../../db/getPool.js';

// Verificar si un usuario ya tiene una valoración
const getUserRating = async (userId) => {
  const pool = await getPool();
  const [rating] = await pool.query('SELECT * FROM ratings WHERE user_id = ?', [userId]);
  return rating;
};

// Hacer nueva valoración
const addRating = async (userId, rating, comment) => {
  const pool = await getPool();
  await pool.query(
    'INSERT INTO ratings (user_id, rating, comment) VALUES (?, ?, ?)',
    [userId, rating, comment]
  );
};

export {getUserRating , addRating };
