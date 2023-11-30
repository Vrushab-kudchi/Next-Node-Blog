import express from 'express';
import { POST ,GET ,PUT ,DELETE, getSpecific, getDashboardPosts}  from '../controller/productController.js';

const router = express.Router();

router.post('/product',POST);

router.get('/product', GET);

router.put('/product', PUT);

router.delete('/product', DELETE);

router.get('/product/:id', getSpecific)

router.get('/getDashboardPosts',getDashboardPosts)

export default router;