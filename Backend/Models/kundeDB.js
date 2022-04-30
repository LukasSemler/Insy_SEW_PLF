import { query } from '../DB/index.js';

const loginDB = async ({ email, password }) => {
  const { rows } = await query('SELECT * FROM kunde WHERE email = $1 AND password = $2', [
    email,
    password,
  ]);
  return rows[0];
};

export { loginDB };
