import express from 'express';
const app = express();
import webPush from 'web-push'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

//Database
import db_Conn from './db_Con/db_Conn.js';

//Routes
import user from './route/userRoute.js'

const port = 8000 || process.env.PORT;

//DataBase Connection
db_Conn()

//Web Push
webPush.setVapidDetails(
    'mailto:YOUR_MAILTO_STRING',
    process.env.WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
)


app.use(cors());
app.use(express.json());
app.set(express.urlencoded({ extended: false }));

app.use('/api', user)

app.listen(port, () => {
    console.log(`Server is running at port:${port}`);
})