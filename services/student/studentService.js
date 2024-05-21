const { faker } = require("@faker-js/faker");
const Student = require("../../models/student");

// -------------------------------------------------------------------------------

const addStudentsService = async (num) => {
  const students = [];
  try {
    for (let i = 0; i < num; i++) {
      const student = new Student({
        name: faker.person.fullName(),
        gender: faker.helpers.arrayElement(["Male", "Female"]),
        totalMarks: faker.number.int({ min: 0, max: 100 }),
      });
      students.push(student);
    }

    await Student.insertMany(students);

    console.log("Students inserted successfully");
    return true;
  } catch (error) {
    console.error("Error inserting students:", error);
    return false;
  }
};

// -------------------------------------------------------------------------------

const getStudentsService = async (query) => {
  const { page = 1, pageSize = 10, name, gender, minMarks, maxMarks } = query;

  const pageNumber = parseInt(page);
  const size = parseInt(pageSize);

  const filter = {};

  // Build the filter object based on query parameters
  if (name) filter.name = new RegExp(name, "i"); // Case-insensitive regex search
  if (gender) filter.gender = gender;
  if (minMarks)
    filter.totalMarks = { ...filter.totalMarks, $gte: parseInt(minMarks) };
  if (maxMarks)
    filter.totalMarks = { ...filter.totalMarks, $lte: parseInt(maxMarks) };

  try {
    const students = await Student.find(filter)
      .skip((pageNumber - 1) * size)
      .limit(size);

    const totalStudents = await Student.countDocuments(filter);

    return {
      page: pageNumber,
      pageSize: size,
      totalPages: Math.ceil(totalStudents / size),
      totalStudents,
      students,
    };
  } catch (error) {
    console.log("Error while fetching students", error);
    return false;
  }
};

// -------------------------------------------------------------------------------

module.exports = {
  addStudentsService,
  getStudentsService,
};
