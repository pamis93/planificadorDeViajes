import bcrypt from 'bcrypt';
import joi from 'joi';

import getPool from '../../db/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import sendMailUtils from '../../utils/sendEmailUtil.js';


const userSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().min(8).required(),
  name: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  registrationCode: joi.string().max(100)
});


export const insertUserService = async ( 
  email,
  username,
  password,
  name,
  lastName,
  registrationCode
) => {
  try {
    //Validamos los datos de entrada.
    const { error } =userSchema.validate({ email, username, password, name, lastName,registrationCode});
    if(error){
      throw generateErrorsUtils(`Error de validación: ${error.details[0].message}`, 400);
    }
    // Obtenemos la conexión con la base de datos.
    const pool = await getPool();
    //Comprobamos si existe el usuario previamente.
    const [userExists] = await pool.query(
      'SELECT * FROM users WHERE email=?',
      [email]
    );
    if (userExists.length > 0) {
    throw generateErrorsUtils('El usuario ya está registrado', 409);
    }
    //Creamos el asunto del email
    const subject = 'Activación de tu cuenta de WonderFlifht';

    //Creamos el cuerpo del email
    const body = `
       <html>
          <body>
            <h2>!!Bienvenid@ ${email}</h2>
              <p>
                Gracias por registrarte con nosotros. 
                Estás a un paso de encontrar las mejores ofertas para tus futuros viajes e inolvidables aventuras. 
                Activa tu cuenta
                haciendo click en el siguiente enlace:
              </p>
              <p>
                <a href="http://localhost:3001/users/validate/${registrationCode}">Activar Cuenta</a>
                        
                Ya Puedes empezar a disfrutar de nuestros servicios y 🛩️ por el mundo entero.
              </p>
          </body>
      </html>
        `;
    //Llamamos a la función para enviar el email
    await sendMailUtils(email, subject, body);

    // Hasheamos la contraseña.
    const hashedPass = await bcrypt.hash(password, 10);

    //Insertamos el usuario en la base de datos.
    const [result] = await pool.query(
      `
            INSERT INTO users(email, username, password, name, lastName, registrationCode) VALUES(?,?,?,?,?,?)
            `,
      [
        email,
        username,
        hashedPass,
        name,
        lastName, 
        registrationCode
      ]
    );
    console.log('Usuario guardado en la base de datos', result);
  } catch (error) {
    //Manejamos el error
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};
