const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "eruewrbuhe");
    const findUser = await User.findOne({ email });

    if (!findUser && password !== undefined) {
      console.log("enter1")
      await User.create({ ...req.body });
      return res.status(200).send({ data: "Registered SuccssFully" });
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        console.log("enter")
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token).status(200).send("token");
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token).status(200).send("token");
        console.log(token, "register");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const findUser = await User.findOne({ email });

    if (findUser && findUser.password == password) {
      const data = findUser._id;
      const token = await jwt.sign(
        { userId: data, email: findUser.email },
        "abcd123",
        { expiresIn: "10000h" }
      );
      res
        .cookie("token", token, { expires: new Date(Date.now() + 9999999) })
        .send(token);
      console.log(token);
    } else if (password === undefined) {
      if (!findUser && password === undefined) {
        console.log("enter")
        const result = await User.create({ ...req.body });

        const data = result._id;
        const token = await jwt.sign(
          { userId: data, email: result.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token).status(200).send("token");
      } else {
        const data = findUser._id;
        const token = await jwt.sign(
          { userId: data, email: findUser.email },
          "abcd123",
          { expiresIn: "10000h" }
        );
        res.cookie("token", token).status(200).send("token");
        console.log(token, "register");
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
