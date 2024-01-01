const User = require("../Modals/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const otplib = require("otplib");
const { sendPasswordResetMail } = require("../middleWare/sendMailVerification");
const { get,isEmpty } = require("lodash");

const createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;
    const isUser = await User.findOne({ email });
    const isPhone = await User.findOne({ phone });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isUser) {
      return res.status(404).send({ message: "this email already exists" });
    }
    if (isPhone) {
      return res.status(404).send({ message: "This number already exists" });
    }

    await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    return res.status(200).send({ data: "Registered successfully" });
  } catch (e) {
    console.log(e);
  }
};

const getUser = async (req, res) => {
  const { email, phone, password } = req.body;
  const findUser = await User.findOne({ email });
  const isPhone = await User.findOne({ phone });
 
 

  if (findUser&&!isEmpty(password)) {
    console.log("enterout")
    const isPasswordValid = await bcrypt.compare(
      password,
      get(findUser, "password", "") || "123"
    );
    if (!isPasswordValid) {
      return res.status(404).send({ message: "Password is not valid" });
    }
    const data = findUser?._id;
    const token = await jwt.sign(
      {
        userId: data,
        email: findUser?.email || null,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ token });
    return
  }

  if (findUser && isEmpty(password) || isPhone) {
    console.log("enter in")
    const data = findUser?._id || isPhone?._id;
    const token = await jwt.sign(
      {
        userId: data,
        email: findUser?.email || null,
        number: isPhone?.phone || null,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ token });
  }

  if (!findUser && !isPhone && !password) {
    const result = await User.create({ ...req.body });
    const token = await jwt.sign(
      {
        userId: result?._id,
        email: result?.email || null,
        phone: result?.phone || null,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10000h" }
    );
    res.status(200).send({ token });
  } else if (!findUser) {
    return res.status(404).send({ message: "User not found" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmail = await User.findOne({ email });

    if (isEmpty(isEmail)) {
      return res.status(404).send({ message: "User not found" });
    } else {
      const secret = otplib.authenticator.generateSecret();
      const otp = otplib.authenticator.generate(
        get(isEmail, "email", ""),
        "Ecommerce",
        secret
      );
      sendPasswordResetMail(email, otp, secret);
      if (otp) {
        return res.status(200).send({ data: otp });
      } else {
        return res.status(200).send({ message: "Otp verification failed..." });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await User.find({ email });
    const isPasswordValid = await bcrypt.compare(password, isEmail[0].password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(isEmail);

    if (isPasswordValid) {
      return res.status(404).send({ message: "Try a different password" });
    }

    if (!isEmail.length) {
      return res.status(404).send({ message: "Email not found" });
    }

    await User.findByIdAndUpdate(isEmail[0]._id, {
      email: email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    return res.status(200).send({ message: "Password updated successfully" });
  } catch (e) {}
};

module.exports = {
  createUser,
  getUser,
  forgotPassword,
  passwordReset,
};
