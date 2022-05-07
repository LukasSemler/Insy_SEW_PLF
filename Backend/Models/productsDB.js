import { query, pool } from '../DB/index.js';

const getProductsDB = async (id) => {
  if (!id) {
    const { rows } = await query(`SELECT p.p_id,
       p.titel,
       p.beschreibung,
       p.link_thumbnail,
       p.preis,
       array_agg(k.titel ORDER BY k.titel asc) as "kategorien"
from produkt p
         join produkt_kategorie pk on p.p_id = pk.p_id
         join kategorie k on k.k_id = pk.k_id
GROUP BY p.p_id, p.titel, p.beschreibung, p.link_thumbnail, p.preis`);
    return rows;
  } else {
    const { rows } = await query(
      `SELECT p.p_id,
       p.titel,
       p.beschreibung,
       p.link_thumbnail,
       p.preis,
       array_agg(k.titel ORDER BY k.titel asc) as "kategorien"
from produkt p
         join produkt_kategorie pk on p.p_id = pk.p_id
         join kategorie k on k.k_id = pk.k_id where p.p_id = $1
GROUP BY p.p_id, p.titel, p.beschreibung, p.link_thumbnail, p.preis`,
      [id],
    );
    return rows[0];
  }
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

const deleteProductDB = async (p_id) => {
  try {
    const { rows } = await query('DELETE FROM produkt WHERE p_id = $1 returning *;', [p_id]);
    return rows[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const patchProductDB = async (id, body) => {
  try {
    if (body.link_thumbnail) {
      const { rows } = await query(
        'UPDATE produkt SET titel = $1, beschreibung = $2, preis = $3, link_thumbnail = $4 where p_id = $5 returning *;',
        [body.titel, body.beschreibung, body.preis, body.link_thumbnail, id],
      );

      console.log('rows', rows);

      return rows[0];
    } else {
      const { rows } = await query(
        'UPDATE produkt SET titel = $1, beschreibung = $2, preis = $3 where p_id = $4 returning *;',
        [body.titel, body.beschreibung, body.preis, id],
      );

      console.log('rows', rows);

      return rows[0];
    }
  } catch (error) {
    console.log(error.message);

    return null;
  }
};

const getProductKundeBewertungDb = async (knd_id, id) => {
  try {
    const { rows } = await query(
      `SELECT bs.bs_id, bp_id, p_id, k_id
from bestellung bs
         join bestellung_produkt bp on bs.bs_id = bp.bs_id
where k_id = $1
  and p_id = $2`,
      [knd_id, id],
    );

    if (rows[0]) return rows[0];
    else return null;
  } catch (error) {
    console.log('error', error.message);
  }
};

const addProductBewertungDB = async (titel, beschreibung, rating, knd_id, id) => {
  try {
    const { rows } = await query(
      'INSERT INTO bewertung (titel, beschreibung, anzahl_sterne, p_id, k_id) VALUES ($1, $2, $3, $4, $5) returning *;',
      [titel, beschreibung, rating, id, knd_id],
    );

    if (rows[0]) return rows[0];
    else return null;
  } catch (error) {}
};

export {
  getProductsDB,
  getProductBewertungDb,
  addProductDB,
  deleteProductDB,
  patchProductDB,
  getProductKundeBewertungDb,
  addProductBewertungDB,
};
