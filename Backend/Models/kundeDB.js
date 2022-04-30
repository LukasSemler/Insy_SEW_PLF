import { query, pool } from '../DB/index.js';

const loginDB = async ({ email, password }) => {
  const { rows } = await query('SELECT * FROM kunde WHERE email = $1 AND password = $2', [
    email,
    password,
  ]);
  return rows[0];
};

const registerDB = async ({ vorname, nachname, email, strasse_hnr, stadt, plz, password }) => {
  const client = await pool.connect();

  try {
    //Transaktion starten
    client.query('BEGIN');

    // Schauen ob ein user vorhanden ist
    const { rows } = await client.query('SELECT * FROM kunde WHERE email = $1', [email]);

    if (rows[0]) return null;
    else {
      //Wenn kein kunde vorhanden ist, dann einen neuen anlegen
      const { rows } = await query(
        'INSERT INTO kunde (vorname, nachname, strasse_hnr, plz, ort, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [vorname, nachname, strasse_hnr, plz, stadt, email, password],
      );

      client.query('COMMIT');

      return rows[0];
    }
  } catch (error) {
    console.log(error.message);
    client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

export { loginDB, registerDB };
