import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

export const updateUserRegCodeService = async (registrationCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
          SELECT id FROM usuarios WHERE registrationCode=?
          `, [registrationCode]
  );

  if (!user.length) throw generateErrorsUtils('No existe ese código de registro', 400);
  await pool.query(
        `
          UPDATE usuarios
          SET habilitado=true, registrationCode=null WHERE registrationCode=?
        `,
    [registrationCode]
  );
};
