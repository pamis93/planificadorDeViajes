import getPool from '../../db/getPool.js';

const getRatingsService = async () => {
  const pool = await getPool();

  // Consulta para obtener todas las valoraciones
  const [ratings] = await pool.query(`
    SELECT r.id, r.rating, r.comment, r.created_at, r.updated_at, u.username
    FROM ratings AS r
    INNER JOIN users AS u ON u.id = r.user_id;
    `);

  const [result] = await pool.query(`
    select AVG(rating) as mediaValoraciones
    FROM ratings
    `);

  const [countResult] = await pool.query(
    ` SELECT COUNT(*) as numVotes FROM ratings; `
  );

  return {
    averageRating: result[0].mediaValoraciones, // El promedio de las valoraciones
    numVotes: countResult[0].numVotes,
    ratings, // Las valoraciones individuales
  };
};

export default getRatingsService;
