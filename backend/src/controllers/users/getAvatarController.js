import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import selectUserByIdService from '../../services/users/selectUserByIdService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getAvatarController = async (req, res, next) => {
  try {
    const user = await selectUserByIdService(req.user.id);

    if (!user || !user.avatar) {
      return res.status(404).send({
        status: 'error',
        message: 'No se ha encontrado ningún avatar',
      });
    }
    const avatarRoute = path.resolve(__dirname, '../../uploads', user.avatar);
    console.log('Avatar path:', avatarRoute);
    
    if (!fs.existsSync(avatarRoute)) {
      return res.status(404).send({
        status: 'error',
        message: 'La ruta del archivo "Avatar" no se encuentra',
      });
    }
    res.sendFile(avatarRoute);
  } catch (error) {
    next(error);
  }
};
