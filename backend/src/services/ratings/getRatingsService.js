import getPool from '../../db/getPool.js';

const getRatingsService = async () => {
  const pool = await getPool();

  // Consulta para obtener todas las valoraciones
  const [ratings] = await pool.query('SELECT * FROM ratings');

  // Si hay valoraciones, calculamos el promedio
  let averageRating = 'No Rating Yet'; 
  if (ratings.length > 0) {
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    averageRating = (totalRatings / ratings.length).toFixed(1);  // Promedio con 2 decimales
  }

  return {
    averageRating,  // El promedio de las valoraciones
    ratings,  // Las valoraciones individuales
  };
};

export default getRatingsService;


