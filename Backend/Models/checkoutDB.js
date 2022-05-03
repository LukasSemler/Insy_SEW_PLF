import { query, pool } from '../DB/index.js';

const checkoutDB = async (total, contact_info, produkte, aktiverUser) => {
  const client = await pool.connect();

  try {
    //TRANSACTION START
    await client.query('BEGIN');

    let date = new Date();
    let datum_formatiert = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;

    //INSERT INTO BESTELLUNG
    const { rows } = await client.query(
      'INSERT INTO bestellung (bestelldatum, bestell_summe, k_id) VALUES ($1, $2, $3) returning bs_id',
      [datum_formatiert, total, aktiverUser.knd_id],
    );

    console.log('rows: ', rows);

    const insertBestellungProdukt = [];

    for (const iterator of produkte) {
      insertBestellungProdukt.push(
        client.query('INSERT INTO bestellung_produkt (bs_id, p_id) VALUES ($1, $2);', [
          rows[0].bs_id,
          iterator.p_id,
        ]),
      );
    }

    const result = await Promise.all(insertBestellungProdukt);

    console.log('result: ', result);

    await client.query('COMMIT');

    return true;
  } catch (error) {
    console.log(error.message);
    client.query('ROLLBACK');

    return false;
  } finally {
    client.release();
  }
};

export { checkoutDB };
