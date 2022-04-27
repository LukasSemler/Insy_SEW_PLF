import validator from 'is-my-json-valid';
import { getProductsDB } from '../Models/productsDB.js';

const getProducts = async (req, res) => {
  res.status(200).json(await getProductsDB());
};

export { getProducts };
