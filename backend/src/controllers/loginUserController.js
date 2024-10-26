import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';
import selectUserByEmailService from '../services/users/selectUserByEmailService.js';

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // todo
    // validar el body con JOI

    if (!email || !password)
      throw generateErrorsUtils('se require de email o contraseña', 400);

    const user = await selectUserByEmailService(email);

    let validPassword;

    if (user) {
      validPassword = await bcrypt.compare(password, user.password);
    }

    if (!user || !validPassword) {
      throw generateErrorsUtils('Usuario o contraseña incorrecta', 401);
    }

    // TODO
    // validar que el usuario este activo

    const tokenInfo = {
      id: user.id,
      role: user.role,
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
