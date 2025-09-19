import type { Request, Response } from 'express';
import type { Product } from '../types/index.js';

// Mock database of products
const products: Product[] = [
  {
    ean: '1234567890123',
    name: 'Elegantne Must Rinnahoidja',
    description: 'Klassikaline ja mugav must rinnahoidja igapäevaseks kandmiseks.',
    price: 39.99,
    imageUrl: 'https://placehold.co/400x400/000000/FFFFFF?text=Toode+1',
    stock: 10,
  },
  {
    ean: '9876543210987',
    name: 'Siidised Valged Aluspüksid',
    description: 'Luksuslikud ja pehmed siidist aluspüksid.',
    price: 19.99,
    imageUrl: 'https://placehold.co/400x400/FFFFFF/000000?text=Toode+2',
    stock: 5,
  },
  {
      ean: '5555555555555',
      name: 'Punane Pitsist Bodi',
      description: 'Kirglik ja võrgutav punane bodi erilisteks hetkedeks.',
      price: 59.99,
      imageUrl: 'https://placehold.co/400x400/FF0000/FFFFFF?text=Toode+3',
      stock: 0,
  }
];


export const getProductByEan = (req: Request, res: Response) => {
  const { ean } = req.params;
  const logger = req.log;
  logger.info(`Fetching product with EAN: ${ean}`);
  const product = products.find(p => p.ean === ean);

  if (product) {
    logger.info({ product }, `Found product with EAN: ${ean}`);
    res.json(product);
  } else {
    logger.warn(`Product with EAN: ${ean} not found`);
    res.status(404).json({ message: 'Toodet ei leitud' });
  }
};
