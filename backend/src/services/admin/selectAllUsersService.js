import getPool from '../../db/getPool.js';

const selectAllUsersService = async () => {
  const pool = await getPool();

  const [users] = await pool.query(`
        SELECT 
                id, 
                email, 
                username, 
                name, 
                lastName, 
                avatar, 
                is_admin, 
                enable,
                created_at, 
                updated_at 
            FROM users
            ORDER BY created_at DESC
        `);

  //   console.log(users);
  return [users];
};
export default selectAllUsersService;
