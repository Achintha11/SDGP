const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const subtasks = require("./routes/subtasks");
const AuthRoute = require("./routes/AuthRoute")
const scheduleDataRoute = require("./routes/scheduleData")
const cors = require("cors");
const connectDB = require("./db/connect");
require("dotenv").config();
const admin = require('firebase-admin');
const serviceAccount = require("./studymatev1-firebase-adminsdk-redzw-63db6e1302.json")
const moment = require("moment");






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const { addNewMainTask } = require("./services/taskService");


const startDate = moment('2024-03-17'); // Replace with your actual start date
const dueDate = moment('2024-03-19'); // Replace with your actual due date

const Title = 'Achintha Test 4';
const workHours = 12;
const color ='purple'
const uid = 'kcCUl5NWeQWJHtmJMe7SfcF8hK12'



 
 addNewMainTask(Title, workHours, startDate, dueDate , color , uid);



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//middleware
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(express.json());
app.use("/api/v1/subtasks", subtasks);
app.use("/api/v1/scheduleData" , scheduleDataRoute);



app.use("/api/v1/tasks", tasks);
app.use(AuthRoute);



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
      "10.31.1.77",
      console.log(`Server is listening on port ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
