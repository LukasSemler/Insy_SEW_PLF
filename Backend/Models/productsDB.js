import { query } from '../DB/index.js';

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

export { getProductsDB, getProductBewertungDb };
