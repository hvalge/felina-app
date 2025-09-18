import { Router } from 'express';
import { getProductByEan } from '../controllers/productController';

const router = Router();

router.get('/:ean', getProductByEan);

export default router;
