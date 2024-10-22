import 'dotenv/config';
import mysql from 'mysql2/promise';



console.log('Conectando a la base de datos con las siguientes credenciales:');
console.log(`Usuario: ${process.env.DB_USER}`); // Cambia DB_USER a process.env.DB_USER
console.log(`Contraseña: ${process.env.DB_PASSWORD}`);

const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} = process.env;

let pool;

const getPool = async () => {
    try {
        
        if(!pool){
            pool = mysql.createPool({
                connectionLimit: 10,
                host: DB_HOST || 'localhost',
                port: DB_PORT || 3306,
                user: DB_USER,
                password: DB_PASSWORD,
                database: DB_NAME,
                timezone: 'Z'
            });
        }

        return await pool;

    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);  
    }
}

export default getPool;