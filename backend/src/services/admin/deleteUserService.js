import getPool from '../../db/getPool.js';

// no se te olvide el WHERE en el DELETE FROM
// https://www.youtube.com/watch?v=i_cVJgIz_Cs&ab_channel=JorgeRubiraSantos
const deleteUserService = async (id) => {
  const pool = await getPool();

  const affectedRows = await pool.query(
    `
    DELETE FROM users 
    WHERE id=?
    `,
    [id]
  );

  return affectedRows;
};

export default deleteUserService;
