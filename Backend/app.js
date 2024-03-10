const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();

//middleware
app.use(cors());

app.use(express.json());

app.use("/api/v1/tasks", tasks);

//routes
app.get("/hello", (req, res) => {
  res.send("StudyMate");
});



const port = 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(
      port,
      "192.168.43.248",
      console.log(`Server is listening on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
