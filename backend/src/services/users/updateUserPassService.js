import bcrypt from 'bcrypt';
import Joi from 'joi';

import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
const passSchema = Joi.object({
  recoverPassCode: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});

export const updateUserPassService = async (recoverPassCode, newPassword) => {
  const { error } = passSchema.validate({ recoverPassCode, newPassword });
    if (error) {
    throw generateErrorsUtils(`Validation error: ${error.details[0].message}`, 400);
  }

  const pool = await getPool();

  // Buscar al usuario por recoverPassCode
  const [[user]] = await pool.query(
    `
    SELECT id, recoverPassCode
    FROM users
    WHERE recoverPassCode = ?
    `,
    [recoverPassCode]
  );

  if (!user) {
    throw generateErrorsUtils('Código de recuperación incorrecto', 409);
  }

  
  const hashPassword = await bcrypt.hash(newPassword, 10);

  
  await pool.query(
    `
    UPDATE users
    SET password = ?, recoverPassCode = NULL
    WHERE id = ?
    `,
    [hashPassword, user.id]
  );
};
