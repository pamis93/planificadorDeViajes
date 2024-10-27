import getPool from '../../db/getPool.js';

const insertFavoriteFlightService = async (
  origen,
  destino,
  fecha_salida,
  fecha_llegada,
  duracion,
  nota,
  userId
) => {
  const pool = await getPool();
  const [result] = await pool.query(
    `
        INSERT INTO favoritos (usuario_id, origen, destino, fecha_salida, fecha_llegada, duracion, nota)
            VALUES (?,?,?,?,?,?,?)
        
        `,
    [userId, origen, destino, fecha_salida, fecha_llegada, duracion, nota]
  );

  //   console.log('result', result);
  const { insertId } = result;

  const favorite = await pool.query(`SELECT * FROM favoritos WHERE id = ?`, [
    insertId,
  ]);

  //   console.log('favorite', favorite);

  return favorite[0];
};

export default insertFavoriteFlightService;
