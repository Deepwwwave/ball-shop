import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';
import 'dotenv/config.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import helmet from "helmet";

import {PORT} from './config/index.js';
import router from './router/index.js';

import {errorHandler} from './error/errorHandler.js'
import {normalLimiter} from "./middlewares/ratelimit.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(normalLimiter);
app.use(cookieParser())
app.use(router);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Listening a http://localhost:${PORT}`);
 });
