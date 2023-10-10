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


    app.get("/validateToken", (req, res) => {
        const authHeader = req.headers.cookie.split('=')[1]
        if (!authHeader) {
            return res.status(401).send({ error: "Unauthorized" });
          }
        
          // Extract the token part from the header
          try {
            const decodedToken = jwt.verify(authHeader, "abcd123");
            console.log(decodedToken)
            res.status(200).send(decodedToken);
          } catch (error) {
            console.error("Token validation failed:", error);
            res.status(401).send({ error: "Unauthorized" });
          }
      });
     
      
      
      
      
      
      