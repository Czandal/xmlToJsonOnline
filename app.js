import express from 'express';
const app = express();
import cors from 'cors';
import { listener } from './listener.js'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use(listener);


export default app;