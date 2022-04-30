import express from 'express';
import { studentModel } from '../models/student.js';
import { supportModel } from '../models/support.js';

const app = express();

app.get('/support', async (req, res) => {
  const support = await supportModel.find({});

  try {
    res.send(support);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/support', async (req, res) => {
  const support = new supportModel(req.body);

  try {
    await support.save();
    res.status(201).send(support);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/student', async (req, res) => {
  const student = await studentModel.find({});

  try {
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/student', async (req, res) => {
  const student = new studentModel(req.body);

  try {
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete(req.params.id);

    if (!student) {
      res.status(404).send('Documento nao encontrado');
    }

    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(req.params.id, req.body, { new: true });

    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as devPortalRouter };
