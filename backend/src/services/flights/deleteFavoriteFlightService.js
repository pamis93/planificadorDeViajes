import getPool from '../../db/getPool';

const deleteFavoriteFlightService = async (flightId) => {
  const pool = await getPool();

  await pool.query(
    `
        DELETE FROM favoritos 
        WHERE flightId =?

        `,
    [flightId]
  );
};

export default deleteFavoriteFlight;
