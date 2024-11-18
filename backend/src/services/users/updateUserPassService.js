import bcrypt from 'bcrypt';
import Joi from 'joi';

import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import selectUserByEmailService from './selectUserByEmailService.js';

const passSchema = Joi.object({
    email:Joi.string().email().required(),
    newPassword: Joi.string().min(8).required(),
  })

export const updateUserPassService = async (
  email,
  newPassword
) => {
 
  const { error } = passSchema.validate({email, newPassword});
    if(error){
      throw generateErrorsUtils(`Validation error: ${error.details[0].message}`, 400);
    }   

  const pool = await getPool();

  const user = await selectUserByEmailService(email);

  if (!user || user.email !== email) {
    throw generateErrorsUtils('Error de autenticación, acción denegada', 409);
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  try {

    await pool.query(
      `
              UPDATE users
              SET password=?,
              WHERE email=?
          `,
      [hashPassword, email]
    );
  } catch (error) {
    throw generateErrorsUtils('Error al actualizar la base de datos', 500);
  }

  return {message: 'Contraseña actualizada'};
};
