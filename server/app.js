import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config()
// Import db
import db from './model/db.js'

// Import Routes 
import categoryRouter from './router/categoryRoute.js'
import productRouter from './router/productRoute.js'
import trendingRouter from './router/trendingRoute.js'
import loginRouter from './router/loginRouter.js'


// Root Varaible
const app = express();

// Allow Cors
app.use(cors({
  origin: ['http://daytech.blog', 'http://www.daytech.blog', 'http://localhost:3004'],// Replace with the actual origin of your Next.js app
  credentials: true,
}));
// Allow larger payloads
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//Allowing Morgan
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Allowing Routers
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', trendingRouter);
app.use('/api', loginRouter);

app.listen(process.env.PORT, () => {
    console.log(process.env.URL);
});