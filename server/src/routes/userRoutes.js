const { signupUser, loginUser } = require("../controller/userController");
const { verifyToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.all("/*", (req, res) => {
  return res.status(404).send({
    status: false,
    msg: "This API request is not available! useRoute",
  });
});

module.exports = router;
