import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Joi from 'joi';

import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';

const loginUserController = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(50).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {      
      throw generateErrorsUtils(error.message, 400);
    }

    const { email, password } = req.body;

    const user = await selectUserByEmailService(email);

    if (!user) {
      throw generateErrorsUtils('Usuario o contraseña incorrecta', 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateErrorsUtils('Usuario o contraseña incorrecta', 401);
    }

    
    if (!user.enable) {
      throw generateErrorsUtils('Usuario no activo', 403);
    }

    const tokenInfo = {
      id: user.id,
      isAdmin: user.is_admin,
      enable: user.enable,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '2d',
    });

    res.send({
      status: 'ok',
      message: 'Usuario logueado correctamente',
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
