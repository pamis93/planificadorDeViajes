/**
 * Middleware de autenticación de un administrador.
 *
 * Este middleware verifica que el usuario tenga las credenciales necesarias en * la base de datos para acceder a las rutas de administrador
 *
 * Se usa luego de validar los token de usuario con el middleware de auth user
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

import generateErrorsUtils from '../utils/generateErrorsUtils.js';

const authAdmin = (req, res, next) => {
  try {
    const { id, isAdmin, enable } = req.user;

    // console.log(req.user);

    if (!isAdmin || !enable) {
      throw generateErrorsUtils('No tienes permisos de administrador', 403);
    }

    // console.log('pase el middleware de authadmin');
    next();
  } catch (error) {
    next(error);
  }
};

export default authAdmin;
