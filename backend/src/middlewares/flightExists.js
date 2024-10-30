import getPool from '../db/getPool.js';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';

const flightExists = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { flightId } = req.params;

    const [favorite] = await pool.query(
      `
            
            SELECT id FROM fav WHERE id=?
            
            `,
      [flightId]
    );

    if (!favorite.length)
      throw generateErrorsUtils('Vuelo Favorito no existe', 404);

    next();
  } catch (error) {
    next(error);
  }
};

export default flightExists;
