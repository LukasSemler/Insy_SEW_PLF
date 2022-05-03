import { query, pool } from '../DB/index.js';

const getOrdersDB = async (knd_id) => {
  const client = await pool.connect();

  try {
    //Transaktion starten
    await client.query('BEGIN');

    const { rows } = await client.query('SELECT bs_id from bestellung where k_id = $1', [knd_id]);

    const anzahlBestellungen = rows;

    console.log(anzahlBestellungen);
    let alleBestellungen = [];

    for (const iterator of rows) {
      let produkte = [];
      const { rows } = await query(
        `select b.bs_id,
           titel,
           beschreibung,
           link_thumbnail,
           preis,
           vorname,
           nachname,
           email,
           bestelldatum,
           bestell_summe
    from produkt
             join bestellung_produkt bp on produkt.p_id = bp.p_id
             JOIN bestellung b on b.bs_id = bp.bs_id
             JOIN kunde k on k.knd_id = b.k_id WHERE knd_id = $1 and b.bs_id = $2 ;`,
        [knd_id, iterator.bs_id],
      );

      for (const iterator of rows) {
        produkte.push({
          titel: iterator.titel,
          beschreibung: iterator.beschreibung,
          preis: iterator.preis,
          link_thumbnail: iterator.link_thumbnail,
        });
      }

      let obj = {
        bs_id: rows[0].bs_id,
        bestelldatum: rows[0].bestelldatum,
        bestell_summe: rows[0].bestell_summe,
        produkte: produkte,
      };

      alleBestellungen.push(obj);
    }

    return alleBestellungen;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export { getOrdersDB };
