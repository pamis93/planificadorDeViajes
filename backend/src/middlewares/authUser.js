/**
 * Middleware de autenticación de usuarios para validar el token JWT de un usuario.
 *
 * Este middleware verifica si existe un token de autorización en los headers de la solicitud,
 * lo valida usando el paquete `jsonwebtoken`, y adjunta la información decodificada del token
 * al objeto `req.user` si es válido.
 *
 * @function authUser
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.headers - Headers de la solicitud, donde se espera que esté el token de autorización.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware o manejador de errores.
 *
 * @throws {Error} Si no se encuentra el token en los headers o si el token es inválido.
 * @returns {void}
 *
 */
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
