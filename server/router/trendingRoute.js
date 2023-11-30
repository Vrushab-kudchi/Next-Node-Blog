import express from 'express';
import { POST ,GET ,DELETE, getTrendingPost ,dashboardtrending, getdashboardtrending}  from '../controller/trendingController.js';

const router = express.Router();

router.post('/trending',POST);

router.get('/trending', GET);

router.delete('/trending', DELETE);

router.get('/getTrendingPost', getTrendingPost)

router.get('/dashboardtrending', dashboardtrending)

router.get('/getdashboardtrending',getdashboardtrending)

export default router;