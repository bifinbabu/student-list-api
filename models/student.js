const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
