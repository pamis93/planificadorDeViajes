import { updateUserPassService } from "../services/users/updateUserPassService.js";


export const editUserPassController = async (req, res, next) => {
  try {
    const { email, recoverPassCode, newPassword } = req.body;

    await updateUserPassService(email, recoverPassCode, newPassword);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    }); 
  } catch (error) {
    next(error);
  }
};