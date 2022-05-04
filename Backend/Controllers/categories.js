import { getCategoriesDB } from '../Models/categoriesDB.js';

const getCategories = async (req, res) => {
  const result = await getCategoriesDB();

  if (result) return res.status(201).json(result);
  else return res.status(400).send('error in getCategories');
};

export { getCategories };
