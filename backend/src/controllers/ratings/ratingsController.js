import getPool from '../../db/getPool.js';

const ratingsController = async (req, res) => {
  const pool = await getPool();

  try {
    if (req.method === 'GET') {
      //ver valoraciones (para cualquier usuario )
      const [ratings] = await pool.query('SELECT * FROM ratings');
      return res.json({
        status: 'ok',
        data: ratings,
      });

    } else if (req.method === 'POST') {
      // Agregar una nueva valoración (requiere autenticación)
      const { rating, comment } = req.body;
      const userId = req.user.id; 

      // Verificar que la calificación esté entre 1 y 5
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          status: 'error',
          message: 'La valoración debe ser un número entre 1 y 5',
        });
      }

      await pool.query(
        'INSERT INTO ratings (user_id, rating, comment) VALUES (?, ?, ?)',
        [userId, rating, comment]
      );

      return res.status(201).json({
        status: 'ok',
        message: 'Valoración añadida correctamente',
      });

    } else if (req.method === 'PUT') {
      // Editar una valoración existente (requiere autenticación)
      const { id } = req.params; 
      const { rating, comment } = req.body;
      const userId = req.user.id;

      // Verificar que la calificación esté entre 1 y 5
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          status: 'error',
          message: 'La valoración debe ser un número entre 1 y 5',
        });
      }

      // Verificar si la valoración existe y pertenece al usuario autenticado
      const [existingRating] = await pool.query(
        'SELECT * FROM ratings WHERE id = ? AND user_id = ?',
        [id, userId]
      );

      if (existingRating.length === 0) {
        const error = new Error('No tienes autorización para editar este comentario o no existe');
        error.statusCode = 403;
        throw error;
      }

      // Actualizar la valoración y el comentario
      await pool.query(
        'UPDATE ratings SET rating = ?, comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [rating, comment, id, userId]
      );

      return res.status(200).json({
        status: 'ok',
        message: 'Valoración actualizada correctamente',
      });

    } else {
      // Método no permitido
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      return res.status(405).json({
        status: 'error',
        message: `Método ${req.method} no permitido`,
      });
    }
  } catch (error) {
    console.error('Error en la gestión de las valoraciones:', error);
    res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'Hubo un problema en la gestión de las valoraciones',
    });
  }
};

export default ratingsController;
