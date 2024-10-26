import jwt from 'jsonwebtoken';
import generateErrorsUtils from '../utils/generateErrorsUtils.js';
import 'dotenv/config';

const authUser = (req, res, next) => {
  try {
    // intentamos sacar de los headers la autorización es decir el token del usuario
    const { authorization } = req.headers;

    // si no lo hay vamos a lanzar un error y saltamos directamente al next y al manejador de errores
    if (!authorization) {
      throw generateErrorsUtils('Se esperaba un token por el header', 401);
    }

    let tokenInfo;

    // aqui tratamos de verificar el token con jwt
    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch (error) {
      throw generateErrorsUtils('Credenciales invalidas', 401);
    }

    // si todo va bien al objeto request le pasamos la información del token
    req.user = tokenInfo;

    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
