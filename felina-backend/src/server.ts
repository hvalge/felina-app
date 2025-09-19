import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino';
import pinoHttp from 'pino-http';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { verifyApiKey } from './middleware/authMiddleware.js';

dotenv.config();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
    },
  },
});

const app = express();
const port = process.env['PORT'] || 3000;

app.use(pinoHttp({ logger }));

const corsOptions = {
  origin: process.env['ALLOWED_ORIGIN'],
};
app.use(cors(corsOptions));

app.use(express.json());

const apiRouter = express.Router();
apiRouter.use(verifyApiKey);

apiRouter.use('/products', productRoutes);
apiRouter.use('/orders', orderRoutes);

app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.send('Felina Backend is running!');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
