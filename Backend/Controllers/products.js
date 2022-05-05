import validator from 'is-my-json-valid';
import fs from 'fs';
import path from 'path';

import {
  getProductsDB,
  getProductBewertungDb,
  addProductDB,
  deleteProductDB,
  patchProductDB,
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

const getProducts = async (req, res) => {
  const { id } = req.params;
  if (!id) res.status(200).json(await getProductsDB());
  else res.status(200).json(await getProductsDB(id));
};

const getProductBewertung = async (req, res) => {
  const { id } = req.params;

  const result = await getProductBewertungDb(id);

  if (!result.bewertungen) res.status(404).send('Es konnte keine Bewertungen gefunden werden');

  res.status(200).json(result);
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
    res.status(400).send('Something went wrong');
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

export { getProducts, getProductBewertung, thumbnail, addProduct, deleteProduct, patchProduct };
