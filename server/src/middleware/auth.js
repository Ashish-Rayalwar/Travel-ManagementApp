const JWT = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    // const token = req.;
    // const token = authToken && authToken.split(" ")[1];

    console.log(token);
    if (!token)
      return res
        .status(400)
        .send({ status: false, message: "You are not loggedIn Token" });

    if (token) {
      JWT.verify(token, process.env.JWTA, (err, tokenDetails) => {
        if (err) {
          return res.status(403).send({ status: false, message: err.message });
        }
        req.tokenDetails = tokenDetails;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log("error in verifyToken", error.message);
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  try {
    verifyToken(req, res, async () => {
      let userId = req.params.userId;
      if (!mongoose.isValidObjectId(userId))
        return res.status(400).json({ message: "Given FileId is not valid" });
      //   let userId = req.params.userId;
      // console.log(req.tokenDetails.userId, "jno");
      if (req.tokenDetails.userId == userId) {
        next();
      } else {
        res.status(403).send({
          status: false,
          message: "you are not authorized to perform this task",
        });
      }
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log("error in verifyTokenAndAuthorization", error.message);
  }
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
};
