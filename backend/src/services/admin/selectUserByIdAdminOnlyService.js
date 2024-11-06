import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const selectUserByIdAdminOnlyService = async (id) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
        SELECT * 
        FROM users
        WHERE id = ?
        `,
    [id]
  );

  if (!user.length) {
    throw generateErrorsUtils('El usuario no existe', 404);
  }

  return user[0];
};

export default selectUserByIdAdminOnlyService;
