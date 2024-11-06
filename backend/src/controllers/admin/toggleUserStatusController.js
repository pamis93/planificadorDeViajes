import selectUserByIdAdminOnlyService from '../../services/admin/selectUserByIdAdminOnlyService.js';
import toggleUserStatusService from '../../services/admin/toggleUserStatusService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const toggleUserStatusController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await selectUserByIdAdminOnlyService(id);

    // console.log(req.user.id, typeof req.user.id);
    // console.log('el id', id, typeof id);

    if (parseInt(id) === req.user.id) {
      throw generateErrorsUtils(
        'Cuidado estas intentando cambiar tu propio estado'
      );
    }

    const newStatus = !user.enable;

    await toggleUserStatusService(newStatus, id);

    const response = {
      id: id,
      enable: newStatus,
    };

    // console.log('id', id, typeof id);
    // console.log('enable', newStatus, typeof newStatus);

    res.send({
      status: 'ok',
      message: `Usuario ${newStatus ? 'Habilitado' : 'Deshabilitado'} correctamente`,
      data: {
        response,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default toggleUserStatusController;
