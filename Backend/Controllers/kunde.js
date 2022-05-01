import { loginDB, registerDB, changePWDB } from '../Models/kundeDB.js';
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

const changePW = async (req, res) => {
  let passwordBody = req.body.password;
  let password_c_Body = req.body.c_password;

  console.log(passwordBody);
  console.log(password_c_Body);

  if (passwordBody !== password_c_Body)
    return res.status(400).send('Passwörter stimmen nicht überein');

  const kunde = await changePWDB(passwordBody, req.params.id);

  if (kunde) return res.status(201).json(kunde);
  else return res.status(404).send('Der User existiert nicht');
};

export { login, register, changePW };
