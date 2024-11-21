import selectUserByEmailService from '../../services/users/selectUserByEmailService.js'; 

const getProfileUserController = async (req, res, next) => {
  try {
    // Tomamos el email del cuerpo de la solicitud
    const { email } = req.body;

    // Asegurarnos de que el email esté presente
    if (!email) {
      return res.status(400).json({ message: 'Se requiere un email.' });
    }

    // Consultamos los datos del usuario usando el email
    const user = await selectUserByEmailService(email);

    // Si no se encuentra al usuario
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolvemos los datos del usuario si la consulta fue exitosa
    res.status(200).json(user); 
  } catch (error) {
    next(error); // Manejo de errores
  }
};

export default getProfileUserController;