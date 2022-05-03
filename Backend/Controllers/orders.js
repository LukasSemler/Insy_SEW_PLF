import { getOrdersDB } from '../Models/ordersDb.js';

const getOrders = async (req, res) => {
  const { knd_id } = req.params;

  const result = await getOrdersDB(knd_id);

  if (result) return res.status(201).json(result);
  else return res.status(400).send('Error');
};

export { getOrders };
