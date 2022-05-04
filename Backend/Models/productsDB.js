import { query, pool } from '../DB/index.js';

const getProductsDB = async () => {
  const { rows } = await query('SELECT * FROM produkt;');
  return rows;
};

const getProductBewertungDb = async (id) => {
  try {
    const { rows } = await query(
      `SELECT b_id,
       titel,
       beschreibung,
       p_id,
       anzahl_sterne,
       vorname,
       nachname,
       email
from bewertung
         JOIN kunde k on k.knd_id = bewertung.k_id
WHERE p_id = $1;`,
      [id],
    );

    const erg = await getAnzahlBewertungen(id);

    let objReturn = {
      stats: erg,
      bewertungen: rows,
    };

    console.log(objReturn);

    return objReturn;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getAnzahlBewertungen = async (p_id) => {
  let erg = [];

  for (let index = 1; index < 6; index++) {
    const { rows } = await query(
      `SELECT count(*) as "Sum" from bewertung WHERE anzahl_sterne = $1 and p_id = $2;`,
      [index, p_id],
    );

    erg.push(rows[0]);
  }

  return erg;
};

const addProductDB = async ({ titel, beschreibung, preis, link_thumbnail, kategorie }) => {
  const client = await pool.connect();

  try {
    //begin transaction
    await client.query('BEGIN');

    const { rows } = await client.query(
      'INSERT INTO produkt ( titel, beschreibung, preis, link_thumbnail, link_photo) VALUES ($1, $2, $3, $4, $5) returning *;',
      [titel, beschreibung, preis, link_thumbnail, link_thumbnail],
    );

    const p_id = rows[0].p_id;

    const result = await client.query(
      'INSERT INTO produkt_kategorie (p_id, k_id) VALUES ($1, $2) returning *;',
      [p_id, kategorie.k_id],
    );

    //commit transaction
    await client.query('COMMIT');

    if (result.rows[0]) return rows[0];
    else return null;
  } catch (error) {
    console.log(error.message);
    client.query('ROLLBACK');
    return null;
  } finally {
    client.release();
  }
};

export { getProductsDB, getProductBewertungDb, addProductDB };
