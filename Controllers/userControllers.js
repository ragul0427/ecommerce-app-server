const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser && password !== undefined) {
     
      await User.create({ ...req.body });
      return res.status(200).send({ data: "Registered SuccssFully" });
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token,{secure:true}).status(200).send("token");
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token,{secure:true}).status(200).send("token");
     
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
   
    const findUser = await User.findOne({ email });

    if (findUser && findUser.password == password) {
      const data = findUser._id;
      const token = await jwt.sign(
        { userId: data, email: findUser.email },
        "abcd123",
        { expiresIn: "10000h" }
      );
      res.cookie('token', token, {

        maxAge: 30*24*60*60*1000,

        httpOnly: true,

        secure: true,

        sameSite: 'None',

        domain: 'https://ecommerce-app-client-silk.vercel.app', 

        path: '/'
    });
      
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h", }
        );
        res.cookie('token', token, {

          maxAge: 30*24*60*60*1000,
  
          httpOnly: true,
  
          secure: true,
  
          sameSite: 'None',
  
          domain: 'https://ecommerce-app-client-silk.vercel.app', 
  
          path: '/'
      });
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie('token', token, {

          maxAge:30*24*60*60*1000,
  
          httpOnly: true,
  
          secure: true,
  
          sameSite: 'None',
  
          domain: 'https://ecommerce-app-client-silk.vercel.app', 
  
          path: '/'
      });
        
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser,
  getUser,
};
