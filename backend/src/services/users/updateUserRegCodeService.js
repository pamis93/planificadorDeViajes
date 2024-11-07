import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

export const updateUserRegCodeService = async (registrationCode) => {
  const pool = await getPool();

  const [users] = await pool.query(
    `
          SELECT id FROM users WHERE registrationCode=?
          `, [registrationCode]
  );

  if (!users.length) throw generateErrorsUtils('No existe ese código de registro', 400);
  await pool.query(
        `
          UPDATE users
          SET enable=true, registrationCode=null WHERE registrationCode=?
        `,
    [registrationCode]
  );
};
