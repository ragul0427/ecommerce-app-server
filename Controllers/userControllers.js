const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser && password !== undefined) {
     
      await User.create({ ...req.body });
      return res.status(200).send({ data: "Registered Successfully" });
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        console.log(token);
        
        // Set the token in the Authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).send({ token });
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        console.log(token);
        
        // Set the token in the Authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).send({ token });
     
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
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
      console.log(token);
      
      // Set the token in the Authorization header
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).send({ token });
      
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        console.log(token);
        
        // Set the token in the Authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).send({ token });
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        console.log(token);
        
        // Set the token in the Authorization header
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).send({ token });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = {
  createUser,
  getUser,
};
