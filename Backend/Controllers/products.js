import validator from 'is-my-json-valid';
import fs from 'fs';
import path from 'path';

import {
  getProductsDB,
  getProductBewertungDb,
  addProductDB,
  deleteProductDB,
  patchProductDB,
  getProductKundeBewertungDb,
  addProductBewertungDB,
} from '../Models/productsDB.js';

const dirname = path.resolve();
const validateAddProduct = validator({
  required: true,
  type: 'object',
  properties: {
    titel: {
      required: true,
      type: 'string',
    },
    beschreibung: {
      required: true,
      type: 'string',
    },
    preis: {
      required: true,
      type: 'number',
    },
    link_thumbnail: {
      required: true,
      type: 'string',
    },
    kategorie: {
      required: true,
      type: 'object',
    },
  },
});

const validateAddReview = validator({
  required: true,
  type: 'object',
  properties: {
    titel: {
      required: true,
      type: 'string',
    },
    beschreibung: {
      required: true,
      type: 'string',
    },
    rating: {
      required: true,
      type: 'string',
    },
    knd_id: {
      required: true,
      type: 'number',
    },
  },
});

const getProducts = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(200).json(await getProductsDB());
  else res.status(200).json(await getProductsDB(id));
};

const getProductBewertung = async (req, res) => {
  const { id } = req.params;
  const { knd_id } = req.query;
  console.log(knd_id, id);

  if (!knd_id) {
    const result = await getProductBewertungDb(id);

    if (!result.bewertungen)
      return res.status(404).send('Es konnte keine Bewertungen gefunden werden');

    return res.status(200).json(result);
  } else {
    const result = await getProductKundeBewertungDb(knd_id, id);

    if (!result) return res.status(404).send('Es konnte keine Bewertungen gefunden werden');

    return res.status(200).json(result);
  }
};

const addProduct = async (req, res) => {
  if (!validateAddProduct(req.body)) return res.status(400).send(validateLogin.errors);

  const result = await addProductDB(req.body);

  if (result) return res.status(200).json(result);
  else return res.status(400).send('Something went wrong while adding the product');
};

const thumbnail = async (req, res) => {
  try {
    const { titel, datentyp } = req.body;
    console.log(titel, datentyp);
    const uniqueImageName = path.join(dirname, `public/images/${titel}.${datentyp}`);
    //schauen ob das Bild schon existiert, wenn ja löschen und neu erstellen
    if (fs.existsSync(`${dirname}/public/images/${titel}.${datentyp}`)) {
      fs.unlinkSync(`${dirname}/public/images/${titel}.${datentyp}`);
    }

    fs.writeFileSync(`${uniqueImageName}`, req.files.image.data);

    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(404).send('Something went wrong');
  }
};

const deleteProduct = async (req, res) => {
  const { p_id } = req.params;

  const resultDB = await deleteProductDB(p_id);

  if (resultDB) {
    try {
      let thumbnailLink = resultDB.link_thumbnail;
      //change image path to /public/images/
      thumbnailLink = thumbnailLink.replace('/images/', '/public/images/');
      //remove everything before the /public
      thumbnailLink = thumbnailLink.replace(/^.*\/public\//, '/public/');
      thumbnailLink = path.join(dirname, thumbnailLink);
      //Bild löschen
      fs.unlink(thumbnailLink, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File deleted!');
        }
      });
      return res.status(200).send('Fach wurde erfolgreich gelöscht');
    } catch (error) {
      //Fehler ausgeben
      console.log(error.message);
      //Fehler zurückschicken
      return res.status(500).send('Fehler beim Thumbnail löschen');
    }
  }
  return res.status(400).send('Fehler beim Löschen');
};

const patchProduct = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  console.log('body', body);

  const erg = await patchProductDB(id, body);

  if (erg) {
    res.status(200).send('product wurde geändert');
  } else {
    res.status(400).send('Es ist ein Fehler beim ändern des productes aufgetreten');
  }
};

const postProductBewertung = async (req, res) => {
  if (!validateAddReview(req.body)) return res.status(400).send(validateAddReview.errors);

  const { id } = req.params;
  const { titel, beschreibung, rating, knd_id} = req.body;

  const result = await addProductBewertungDB(titel, beschreibung, rating, knd_id, id);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).send('Es ist ein Fehler beim hinzufügen der Bewertung aufgetreten');
  }
};

export {
  getProducts,
  getProductBewertung,
  thumbnail,
  addProduct,
  deleteProduct,
  patchProduct,
  postProductBewertung,
};
