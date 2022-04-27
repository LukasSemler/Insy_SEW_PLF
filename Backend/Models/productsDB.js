import { query } from '../DB/index.js';

const getProductsDB = async () => {
  const { rows } = await query('SELECT * FROM produkt;');
  return rows;
};

export { getProductsDB };
