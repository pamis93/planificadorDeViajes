import selectAllUsersService from '../../services/admin/selectAllUsersService.js';

const listAllUsersController = async (req, res, next) => {
  try {
    const users = await selectAllUsersService();

    res.send({
      status: 'ok',
      message: 'lista de usuarios',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default listAllUsersController;
