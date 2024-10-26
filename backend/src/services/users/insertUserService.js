import bcrypt from 'bcrypt';

import getPool from '../../db/getPool.js';

export const insertUserService = async ( 
  email,
  username,
  password,
  nombre,
  apellidos,
  avatar
) => {
  try {
    // Obtenemos la conexión con la base de datos.
    const pool = await getPool();
    //Comprobamos si existe el usuario previamente.
    const [userExists] = await pool.query(
      'SELECT * FROM usuarios WHERE email=?',
      [email]
    );
    if (userExists.length > 0) {
      console.log('El usuario ya está registrado');
      return; //salimos de la función si el usuario ya existe.
    }
    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    //Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `
            INSERT INTO usuarios(email, username, password, nombre, apellidos, avatar) VALUES(?,?,?,?,?,?)
            `,
      [
        email,
        username,
        hashedPass,
        nombre,
        apellidos,
        avatar
      ]
    );
    console.log('Usuario guardado en la base de datos', result);
  } catch (error) {
    //Manejamos el error
    console.error('Error al registrar el usuario:', error);
  }
};
