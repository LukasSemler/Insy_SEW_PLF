import { sendContactDB } from '../Models/contactDB.js';
import validator from 'is-my-json-valid';

const validate = validator({
  required: true,
  type: 'object',
  properties: {
    vorname: {
      required: true,
      type: 'string',
    },
    nachname: {
      required: true,
      type: 'string',
    },
    emailAddr: {
      required: true,
      type: 'string',
      format: 'email',
    },
    telNr: {
      required: false,
      type: 'string',
    },
    betreff: {
      require: true,
      type: 'string',
    },
    nachricht: {
      required: true,
      type: 'string',
    },
    date: {
      required: true,
      type: 'string',
    },
  },
});

const sendContact = async (req, res) => {
  if (!validate(req.body)) return res.status(400).send(validate.errors);
  const nachricht = await sendContactDB(req.body);
  return res.status(201).json(nachricht);
};

export { sendContact };
