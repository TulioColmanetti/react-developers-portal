/*Imports */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { devPortalRouter } from './routes/devPortalRoutes.js';

const app = express();

/*Conexao com o MongoDB*/
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Failed to connect to MongoDB!');
    process.exit();
  }
})();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
  })
);
app.use(devPortalRouter);

app.get('/', (_req, res) => {
  res.send('API em execução!');
});

// app.use(express.json());
// app.use(devPortalRouter);

app.listen(process.env.PORT, () => console.log('Server running...'));
