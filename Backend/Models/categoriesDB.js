import { query } from '../DB/index.js';

const getCategoriesDB = async () => {
  try {
    const { rows } = await query('SELECT * FROM kategorie;');
    return rows;
  } catch (error) {
    console.log('Error in getCategoriesDB: ', error.message);
    return null;
  }
};

export { getCategoriesDB };
