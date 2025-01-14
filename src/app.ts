// app.ts
import express from 'express';
import api from './api';
import {errorHandler, notFound} from './middlewares';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Add root route so test for GET / => 200 OK will pass:
app.get('/', (req, res) => {
  res.status(200).json({message: 'Root route OK'});
});

app.use('/api/v1', api);

// error handling
app.use(notFound);
app.use(errorHandler);

export default app;
