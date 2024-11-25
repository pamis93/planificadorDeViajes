mainimport bcrypt from 'bcrypt';
import getPool from "../../db/getPool.js"

export const updateUserService = async(email, username, password, name, lastName, password, name, lastName, userId) => {
    let pool = await getPool();
<<<<<<< HEAD
    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);
=======

    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

>>>>>>> origin/
    await pool.query(
        `
        UPDATE users
        SET email=?, username=?, password=?, name=?, lastName=?, password=?, name=?, lastName=?
        WHERE id=?
        `,
        [email, username, hashedPass, name, lastName, hashedPass, name, lastName, userId]
    );
} 