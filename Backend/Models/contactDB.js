import { query } from '../DB/index.js';

const sendContactDB = async ({ vorname, nachname, emailAddr, telNr, betreff, nachricht, date }) => {
  const { rows } = await query(
    'INSERT INTO contact (betreff, nachricht, datum, vorname, nachname, email, tel_Nr) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *',
    [betreff, nachricht, date, vorname, nachname, emailAddr, telNr],
  );

  return rows[0];
};

export { sendContactDB };
