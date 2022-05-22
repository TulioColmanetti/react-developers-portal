import express from 'express';
import { productModel } from '../models/product.js';
import { serviceModel } from '../models/service.js';
import { supportModel } from '../models/support.js';

const app = express();

//---- Products domain services
app.get('/products', async (req, res) => {
  const products = await productModel.find({});

  try {
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await productModel.findOne({ id: req.params.id });

    if (!product) {
      res.status(404).send('Produto não encontrado!');
    } else {
      res.status(200).send(product);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//---- Services domain services
app.get('/services', async (req, res) => {
  const services = await serviceModel.find({});

  try {
    res.send(services);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/services/:id', async (req, res) => {
  try {
    const service = await serviceModel.findOne({ id: req.params.id });

    if (!service) {
      res.status(404).send('Serviço não encontrado!');
    } else {
      res.status(200).send(service);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//---- Support domain services
app.post('/support', async (req, res) => {
  const support = new supportModel(req.body);

  try {
    await support.save();
    res.status(201).send(support);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as devPortalRouter };
