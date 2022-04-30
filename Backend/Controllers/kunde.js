import { loginDB } from '../Models/kundeDB.js';
import validator from 'is-my-json-valid';

const validate = validator({
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

const login = async (req, res) => {
  if (!validate(req.body)) return res.status(400).send(validate.errors);
  const kunde = await loginDB(req.body);

  if (kunde) res.status(201).json(kunde);
  else res.status(404).send('Login failed');
};

export { login };
