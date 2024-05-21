const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
const port = 3000;
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://merntd:zmVnRfQiaAlt26r1@cluster0.tqaeshh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Endpoints
app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const studentRoutes = require("./routes/student/studentRoutes");
app.use(studentRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
