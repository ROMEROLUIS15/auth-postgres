import express from 'express'; //importar sin require: colocar "type": "module" en package.json bajo "main": "index.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import taskRouter from './src/routes/tasks.routes.js'
import dotenv from 'dotenv';
dotenv.config();



const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', taskRouter)

export default app;
