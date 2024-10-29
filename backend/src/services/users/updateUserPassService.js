import bcrypt from 'bcrypt';
import getPool from "../../db/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "./selectUserByEmailService.js";

export const updateUserPassService = async(email, recoverPassCode, newPassword) => {
    const pool = await getPool();

    const user = await selectUserByEmailService(email);

    if(!user || user.recoverPassCode !== recoverPassCode){
        throw generateErrorsUtils('Email o codigo de recuperación incorrecto', 409);
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
        `
            UPDATE usuarios
            SET password=?, recoverPassCode=null
            WHERE recoverPassCode=?
        `,
        [hashPassword, recoverPassCode]
    );
}
 
