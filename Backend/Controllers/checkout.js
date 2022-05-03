import { checkoutDB } from '../Models/checkoutDB.js';

const checkout = async (req, res) => {
  const { total, contact_info, produkte, aktiverUser } = req.body;
  console.log(total);
  console.log('contact_info: ', contact_info);
  console.log('produkte: ', produkte);

  const result = await checkoutDB(total, contact_info, produkte, aktiverUser);

  if (result) return res.status(201).send('Success');
  else return res.status(400).send('Error');
};
export { checkout };
