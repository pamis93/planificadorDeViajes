import getPool from "../../db/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const selectUserByIdService = async (userId) =>{
    const pool = await getPool();

    const [user] = await pool.query(
        `
        SELECT id, email, name, lastName, avatar
        FROM users
        WHERE id=?
        `,
        [userId]
    );
    if(!user.length){
        throw generateErrorsUtils('El usuario no existe', 404)
    }
    return user[0];
}

export default selectUserByIdService; 