import getPool from '../db/getPool';
import generateErrorsUtils from '../utils/generateErrorsUtils';

const flightExists = async (req, res, next) => {
  try {
    const pool = await getPool();

    const { flightId } = req.params;

    const [favorite] = await pool.query(
      `
            
            SELECT id FROM favoritos WHERE id=?
            
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
