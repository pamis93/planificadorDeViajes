import getPool from "../../db/getPool.js"

export const updateUserService = async(email, username, name, lastname, userId) => {
    let pool = await getPool();
    await pool.query(
        `
        UPDATE users
        SET email=?, username=?, name=?, lastName=?
        WHERE id=?
        `,
        [email, username, name, lastname, userId]
    );
} 

 