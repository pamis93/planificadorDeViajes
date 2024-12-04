import getPool from '../../db/getPool.js';

const deleteRatingService = async (userId) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `
      DELETE FROM ratings 
      WHERE user_id = ?
    `,
    [userId]
  );

  if (result.affectedRows === 0) {
    throw new Error('No se encontró ninguna valoración para el usuario.');
  }

  return result;
};

export default deleteRatingService;
