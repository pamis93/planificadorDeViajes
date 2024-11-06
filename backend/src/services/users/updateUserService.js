import getPool from "../../db/getPool.js"

export const updateUserService = async(email, username, userId) => {
    let pool = await getPool();
    await pool.query(
        `
        UPDATE users
        SET email=?, username=?
        WHERE id=?
        `,
        [email, username, userId]
    );
} 

 