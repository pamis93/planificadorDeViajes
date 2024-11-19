import bcrypt from 'bcrypt';
import getPool from "../../db/getPool.js"

export const updateUserService = async(email, username, password, name, lastName, userId) => {
    let pool = await getPool();

    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    await pool.query(
        `
        UPDATE users
        SET email=?, username=?, password=?, name=?, lastName=?
        WHERE id=?
        `,
        [email, username, hashedPass, name, lastName, userId]
    );
} 

 