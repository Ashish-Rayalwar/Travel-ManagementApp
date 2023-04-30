const {
  createTravel,
  editTravel,
  deleteTravel,
  getTravelDetails,
  getTravelDetailsById,
} = require("../controller/travelController");
const { verifyToken } = require("../middleware/auth");

const router = require("express").Router();

router.post("/travel", verifyToken, createTravel);
router.put("/travel/:userId/:travelId", verifyToken, editTravel);
router.delete("/travel/:userId/:travelId", verifyToken, deleteTravel);
router.get("/travel", verifyToken, getTravelDetails);
router.get("/travel/:travelId", verifyToken, getTravelDetailsById);

module.exports = router;
