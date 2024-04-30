import express, { urlencoded } from 'express';
import cors from 'cors';  // Cross-Origin Resource Sharing middleware
import cookieParser from 'cookie-parser'; //middleware for parsing cookies

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

//use when u get data from forms 
app.use(express.json( {limit:'16kb'})); //middleware for parsing JSON data 
//when u get data from urls
app.use(urlencoded({ extended: true })); //middleware for parsing URL-encoded data
// when receving files from client we use multer
//app.use(multer().none()); //middleware for parsing multipart/form-data
app.use(cookieParser()); //middleware for parsing cookies



export default app;
