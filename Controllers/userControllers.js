const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, confirmPassword, phone } =
      req.body;
    const findUser = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!findUser && password !== undefined) {
      await User.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
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

        // Send the token in the response body
        res.status(200).send({ token });
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );

        // Send the token in the response body
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

    if (findUser) {
      const isPasswordValid = await bcrypt.compare(password, findUser.password);
      if(isPasswordValid){
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
  
        // Send the token in the response body
        res.status(200).send({ token });
      }
     
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );

        // Send the token in the response body
        res.status(200).send({ token });
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );

        // Send the token in the response body
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
