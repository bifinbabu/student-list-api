const express = require("express");
const {
  addStudentsController,
  getStudentsController,
} = require("../../controllers/student/studentController");
const router = express.Router();

router.post("/add-students", addStudentsController);
router.get("/students", getStudentsController);
// router.get("/process-result", processResultController);
// router.get("/team-result", teamResultController);

module.exports = router;
