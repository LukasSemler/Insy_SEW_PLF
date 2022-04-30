import { loginDB, registerDB } from '../Models/kundeDB.js';
import validator from 'is-my-json-valid';

const validateLogin = validator({
  required: true,
  type: 'object',
  properties: {
    email: {
      required: true,
      type: 'string',
      format: 'email',
    },
    password: {
      required: true,
      type: 'string',
    },
  },
});

const validateRegister = validator({
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
    email: {
      required: true,
      type: 'string',
      format: 'email',
    },
    strasse_hnr: {
      required: true,
      type: 'string',
    },
    plz: {
      required: true,
      type: 'string',
    },
    stadt: {
      required: true,
      type: 'string',
    },
    password: {
      required: true,
      type: 'string',
    },
  },
});

const login = async (req, res) => {
  if (!validateLogin(req.body)) return res.status(400).send(validateLogin.errors);
  const kunde = await loginDB(req.body);

  if (kunde) res.status(201).json(kunde);
  else res.status(404).send('Login failed');
};

const register = async (req, res) => {
  if (!validateRegister(req.body)) return res.status(400).send(validateRegister.errors);

  const kunde = await registerDB(req.body);

  if (kunde) return res.status(201).json(kunde);
  else return res.status(404).send('bereits ein Kunde vorhanden');
};

export { login, register };
