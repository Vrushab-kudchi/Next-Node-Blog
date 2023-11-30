import express from 'express';
import { POST, GET, PUT, DELETE, related } from '../controller/categoryController.js';

const router = express.Router();

router.post('/category',POST);

router.get('/category', GET);

router.put('/category', PUT);

router.delete('/category', DELETE);

router.get('/relatedCategory/:id',related)

export default router;