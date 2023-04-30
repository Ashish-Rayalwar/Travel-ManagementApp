require("dotenv").config();

const bcrypt = require("bcryptjs");
let JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { userValidation, loginValidation } = require("../validation/joi");

const signupUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, name } = data;

    const responce = await userValidation.validateAsync(data);
    const checkEmailExist = await userModel.findOne({ email: email });

    if (checkEmailExist)
      return res
        .status(409)
        .json({ message: "Email already exist, try different email" });
    const bcryptPass = await bcrypt.hash(data.password, 10);

    const userData = {
      name: name,
      email: email,
      password: bcryptPass,
    };

    const createUser = await userModel.create(userData);
    const { password, __v, ...rest } = createUser._doc;

    return res
      .status(201)
      .json({ message: "User registration successfull", data: rest });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;
    console.log(error.message, "signup");
    return res.status(error.status).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const { email } = data;

    const responce = await loginValidation.validateAsync(data);
    const checkEmailExist = await userModel.findOne({ email: email });
    if (!checkEmailExist)
      return res.status(404).json({ message: "User Not Found" });

    const userPassword = checkEmailExist.password;
    const originalPassword = await bcrypt.compare(data.password, userPassword);

    const userId = checkEmailExist._id;

    if (!originalPassword)
      return res.status(401).json({
        status: false,
        message: "Incorrect password, plz provide valid password",
      });
    const { password, __v, ...rest } = checkEmailExist._doc;

    const token = JWT.sign({ userId: userId }, process.env.JWTA, {
      expiresIn: 86400,
    });

    return res
      .status(200)
      .send({ message: "Login Success", data: rest, token: token });
  } catch (error) {
    if (error.isJoi == true) error.status = 400;

    console.log("error in loginUser", error.message);
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser };
