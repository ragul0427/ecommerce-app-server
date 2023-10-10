const express=require('express')
const app = express()
const userRouter=require('./Routes/userRoutes')
const bodyParser=require('body-parser')
const cors=require("cors")
require("dotenv").config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const jwt=require("jsonwebtoken")


app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: process.env.ORIGIN,
    allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
    credentials: true,
}));

app.use('/',userRouter)

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(8080, () => {
            console.log("server listening on port 8080");
        });
    })
    .catch((err) => {
        console.log(err);
    });
