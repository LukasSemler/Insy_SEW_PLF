import express from 'express';
import asyncHandler from 'express-async-handler';
import { getProducts, getProductBewertung } from '../Controllers/products.js';
import { sendContact } from '../Controllers/contact.js';
import { login, register, changePW } from '../Controllers/kunde.js';
import { checkout } from '../Controllers/checkout.js';

const router = express.Router();

// Test route
router.get('/', (req, res) => res.status(200).send('Test'));

//Product routes
router.get('/products', asyncHandler(getProducts));
router.get('/productBewertung/:id', asyncHandler(getProductBewertung));

//Contact
router.post('/contact', asyncHandler(sendContact));

//Kunden Routen
router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));
router.patch('/changePW/:id', asyncHandler(changePW));

router.post('/checkout', asyncHandler(checkout));
export default router;
