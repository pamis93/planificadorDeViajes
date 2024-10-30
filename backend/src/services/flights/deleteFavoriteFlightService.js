import getPool from '../../db/getPool.js';

const deleteFavoriteFlightService = async (flightId) => {
  const pool = await getPool();

  await pool.query(
    `
        DELETE FROM fav 
        WHERE id=?

        `,
    [flightId]
  );
};

export default deleteFavoriteFlightService;
