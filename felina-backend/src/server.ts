import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import { verifyApiKey } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 3000;

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

app.get('/', (req, res) => {
  res.send('Felina Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
