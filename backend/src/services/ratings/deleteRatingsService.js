import getPool from '../../db/getPool.js';

const deleteRatingService = async (userId, ratingId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
      DELETE FROM ratings 
      WHERE id = ? AND user_id = ?
    `,
    [ratingId, userId]
  );

  return result;
};

export default deleteRatingService;
