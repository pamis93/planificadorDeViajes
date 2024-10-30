import getPool from '../../db/getPool.js';

const selectFavoriteFlightByIdService = async (flightId) => {
  const pool = await getPool();

  const [favorite] = await pool.query(
    `
        SELECT user_id 
        FROM fav
        WHERE id=?
        `,
    [flightId]
  );

  return favorite[0];
};

export default selectFavoriteFlightByIdService;
