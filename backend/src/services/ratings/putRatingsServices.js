import getPool from '../../db/getPool.js';

const getRatingByIdAndUser = async (id, userId) => {
  const pool = await getPool();
  const [rating] = await pool.query(
    'SELECT * FROM ratings WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return rating;
};

const updateRating = async (id, userId, rating, comment) => {
  const pool = await getPool();
  await pool.query(
    'UPDATE ratings SET rating = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [rating, comment, id, userId]
  );
};

export { getRatingByIdAndUser, updateRating };