import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';

export const updateUserService = async (
  email,
  username,
  password,
  name,
  lastName,
  userId
) => {
  let pool = await getPool();

  let strQuery;
  let valuesQuery;

  if (password) {
    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    strQuery = `
                     UPDATE users
                    SET email=?, username=?, password=?, name=?, lastName=?
                    WHERE id=?
        `;
    valuesQuery = [email, username, hashedPass, name, lastName, userId];
  } else {
    strQuery = `
        UPDATE users
        SET email=?, username=?, name=?, lastName=?
        WHERE id=?
        `;
    valuesQuery = [email, username, name, lastName, userId];
  }

  await pool.query(strQuery, valuesQuery);
};
