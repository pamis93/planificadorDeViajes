import deleteUserService from '../../services/admin/deleteUserService.js';
import selectUserByIdAdminOnlyService from '../../services/admin/selectUserByIdAdminOnlyService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const deleteUserController = async (req, res, next) => {
  try {
    // console.log('corri el controller');

    const { id } = req.params;

    const user = await selectUserByIdAdminOnlyService(id);

    // console.log(user);

    if (user.length === 0) {
      throw generateErrorsUtils('el usuario no fue encontrado', 404);
    }

    if (parseInt(id) === req.user.id) {
      throw generateErrorsUtils('No te puedes borrar a ti mismo', 403);
    }

    const response = await deleteUserService(id);

    // console.log(response);

    if (!response) {
      throw generateErrorsUtils(
        'no se elimino el usuario ocurrió un error en el servicio',
        500
      );
    }

    res.send({
      status: 'ok',
      message: 'el usuario fue  eliminado',
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUserController;
