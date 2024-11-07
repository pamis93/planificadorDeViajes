import randomstring from 'randomstring';
import Joi from 'joi';

import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import recoverPasswordService from '../../services/users/recoverPasswordService.js';

const recoverPasswordController = async (req, res, next) => {
  try {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) generateErrorsUtils(validation.error.message, 401);

    const { email } = req.body;

    const user = await selectUserByEmailService(email);

    if (!user)
      return res.send({
        status: 'ok',
        message: 'Si tu email está registrado, recibirás un enlace para recuperar tu contraseña',
      });

    const recoverPassCode = randomstring.generate(10);

    await recoverPasswordService(email, recoverPassCode);

    res.send({
      status: 'ok',
      message:
        'Si tu email está registrado, recibirás un enlace para recuperar tu contraseña',
    });
  } catch (error) {
    next(error);
  }
};

export default recoverPasswordController;
