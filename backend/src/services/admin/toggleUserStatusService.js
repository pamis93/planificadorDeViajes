import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const toggleUserStatusService = async (newStatus, id) => {
  const pool = await getPool();

  const afectedRows = await pool.query(
    `
        UPDATE users
        SET enable = ?
        WHERE id = ?
        `,
    [newStatus, id]
  );

  if (!afectedRows) {
    throw generateErrorsUtils('No se actualizo correctamente el usuario', 304);
  }
};

export default toggleUserStatusService;
