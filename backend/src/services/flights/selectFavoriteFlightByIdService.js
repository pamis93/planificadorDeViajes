import getPool from '../../db/getPool';

const selectFavoriteFlightByIdService = async (flightId) => {
  const pool = await getPool();

  const [favorite] = await pool.query(`
        
        SELECT favoritos.id
        `);
};

export default selectFavoriteFlightByIdService;
