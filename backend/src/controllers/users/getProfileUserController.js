import selectUserByEmailService from '../../services/users/selectUserByEmailService.js';

const getProfileUserController = async (req, res, next) => {
  try {
    // Tomamos el email del cuerpo de la solicitud
    const { email } = req.body;

    // Asegurarnos de que el email esté presente
    if (!email) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Se requiere un email.',
        data: null
      });
    }

    // Consultamos los datos del usuario usando el email
    const user = await selectUserByEmailService(email);

    // Si no se encuentra al usuario
    if (!user) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Usuario no encontrado',
        data: null
      });
    }

    // Filtra los campos requeridos
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      lastName: user.lastName,
      avatar: user.avatar,
    };

    res.status(200).json({
      status: 'ok',
      message: 'Perfil de usuario obtenido correctamente',
      data: userData
    });
  } catch (error) {
    next(error);
  }
};

export default getProfileUserController; 
