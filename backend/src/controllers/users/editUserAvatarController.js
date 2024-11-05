import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';
import sharp from 'sharp';
import {v4 as uuidv4} from 'uuid';

import { updateUserAvatarService } from '../../services/users/updateUserAvatarService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import selectUserByIdService from '../../services/users/selectUserByIdService.js';

// Borramos la foto si ya existe una
const deletePhoto = async (imgName) => {
    try {
      const imgPath = path.join(process.cwd(), `./src/uploads`, imgName);
      try {
        await fs.access(imgPath);
        await fs.unlink(imgPath);
      } catch {
        return;
      }
    } catch (error) {
      console.log(error);
      throw generateErrorsUtils('Error al eliminar la imagen', 500);
    }
  };

   //Guardamos la nueva imagen 
  const savePhoto = async (img, width) => {
    try {
      const uploadDir = path.join(process.cwd(), `./src/uploads`);
      const imgSharp = sharp(img.data);
      imgSharp.resize(width)//.toFormat('jpeg').toFile(path.join(uploadDir, `${uuidv4()}.jpg`));

      const imgName = `${uuidv4()}.jpg`;

      const pathImg = path.join(uploadDir, imgName);

      await imgSharp.toFile(pathImg);

      return imgName;
    } catch (error) {
      console.log(error);
      throw generateErrorsUtils('Error al guardar imagen', 500);
    }
  };

export const editUserAvatarController = async (req, res, next) => {
  try {

    console.log('req.files:', req.files);
    
    
    if (!req.files || !req.files.avatar) {
      throw generateErrorsUtils('Se ha producido un error al cargar la imagen', 400);
    }

    const { avatar } = req.files;
    console.log('Avatar data:', avatar);
    
    // if (!avatar) {
    //     throw generateErrorsUtils('Se ha producido un error al cargar la imagen', 400);
    //   }


    const user = await selectUserByIdService(req.user.id);
    console.log('User:', user);

    if (!user) {
      throw generateErrorsUtils('Usuario no encontrado', 404);
    }

    if (user.avatar) await deletePhoto(user.avatar) 
    const avatarName = await savePhoto(avatar, 100) 

    await updateUserAvatarService(avatarName, req.user.id);
    res.send({
      status: 'ok',
      message: 'Avatar actualizado',
    });
  } catch (error) {
    next(error);
  }
};
