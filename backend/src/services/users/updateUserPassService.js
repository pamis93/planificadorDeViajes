import bcrypt from 'bcrypt';
import Joi from 'joi';

import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import selectUserByEmailService from './selectUserByEmailService.js';

const passSchema = Joi.object({
    email:Joi.string().email().required(),
    recoverPassCode: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
  })

export const updateUserPassService = async (
  email,
  recoverPassCode,
  newPassword
) => {
 
  const { error } = passSchema.validate({email, recoverPassCode, newPassword});
    if(error){
      throw generateErrorsUtils(`Validation error: ${error.details[0].message}`, 400);
    }   

  const pool = await getPool();

  const user = await selectUserByEmailService(email);

  if (!user || user.recoverPassCode !== recoverPassCode) {
    throw generateErrorsUtils('Email o codigo de recuperación incorrecto', 409);
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
            UPDATE users
            SET password=?, recoverPassCode=null
            WHERE recoverPassCode=?
        `,
    [hashPassword, recoverPassCode]
  );
};
