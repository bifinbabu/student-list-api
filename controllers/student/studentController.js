const {
  addStudentsService,
  getStudentsService,
} = require("../../services/student/studentService");

// ----------------------------------------------------------------------

const addStudentsController = async (req, res) => {
  const response = await addStudentsService(50);
  if (response) {
    res.status(200).json({ message: "Success" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ----------------------------------------------------------------------

const getStudentsController = async (req, res) => {
  const data = await getStudentsService(req.query);
  if (data) {
    res.status(200).json({ data, message: "Success" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ----------------------------------------------------------------------

module.exports = {
  addStudentsController,
  getStudentsController,
};
