import validator from 'is-my-json-valid';
import { getProductsDB, getProductBewertungDb } from '../Models/productsDB.js';

const getProducts = async (req, res) => {
  res.status(200).json(await getProductsDB());
};

const getProductBewertung = async (req, res) => {
  const { id } = req.params;

  const result = await getProductBewertungDb(id);

  if (!result.bewertungen) res.status(404).send('Es konnte keine Bewertungen gefunden werden');

  res.status(200).json(result);
};

export { getProducts, getProductBewertung };
