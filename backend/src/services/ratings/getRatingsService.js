import getPool from '../../db/getPool.js';

//para obtener todos las valoraciones 
const getRatingsService = async () => {
  const pool = await getPool();
  const [ratings] = await pool.query('SELECT * FROM ratings');
  return ratings;
};

export default getRatingsService;
