import 'dotenv/config';
import mysql from 'mysql2/promise';



console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '****' : 'NO PASSWORD');
console.log('DB_NAME:', process.env.DB_NAME);


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
            const poolTemp = mysql.createPool({
                host: DB_HOST,
                port: DB_PORT,
                user: DB_USER,
                password: DB_PASSWORD
                
            });

            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

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
    return pool;

    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);  
    }
}

export default getPool;