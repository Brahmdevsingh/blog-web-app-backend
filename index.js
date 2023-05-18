import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);

const PORT = process.env.PORT;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username, password);

app.listen(PORT, () => console.log(`Server is Running Successfully on PORT ${PORT}`));