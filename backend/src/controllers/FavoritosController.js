import getPool from '../db/getPool.js';

const FavoritosController = async (req, res) => {
  try {
    const pool = await getPool();
    
    const { usuario_id } = req.params;

    const [favoritos] = await pool.query(
      'SELECT * FROM favoritos WHERE usuario_id = ?',
      [usuario_id]
    );

    res.json({
      status: 'success',
      data: favoritos
    });
  } catch (error) {
    console.error('Error al obtener la lista de vuelos favoritos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener la lista de vuelos favoritos'
    });
  }
};

export default FavoritosController;