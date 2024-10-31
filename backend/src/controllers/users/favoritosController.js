import getPool from '../../db/getPool.js';

const favoritosController = async (req, res) => {
  try {
    const pool = await getPool();

    const { usuario_id } = req.params;

    if (usuario_id != req.user.id) {
      const error = new Error('No tienes autorización para ver estos favoritos');
      error.statusCode = 403; 
      throw error;
    }

    const [favoritos] = await pool.query(
      'SELECT * FROM fav WHERE user_id = ?',
      [usuario_id]
    );

    res.json({
      status: 'success',
      data: favoritos,
    });
  } catch (error) {
    console.error('Error al obtener la lista de vuelos favoritos:', error);
    res.status(500).json({
      status: 'error',
      message: 'No tienes autorización para ver estos favoritos',
    });
  }
};

export default favoritosController;
