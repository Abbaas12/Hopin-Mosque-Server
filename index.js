const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(cors());
app.options("*", cors());

require("dotenv/config");
const api = process.env.API_URL;

const authjwt = require("./helper/authjwt");
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authjwt());

//Routers
const prayertimeRouter = require("./router/prayertime");
const advertisingRouter = require("./router/advertising");
const jamaeaRouter = require("./router/jamaea");
const userRouter = require("./router/user");

app.use(`${api}/prayertimes`, prayertimeRouter);
app.use(`${api}/advertisings`, advertisingRouter);
app.use(`${api}/jamaeaes`, jamaeaRouter);
app.use(`${api}/users`, userRouter);

//databaseConnection
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database Connection is ready");
  })
  .catch((err) => console.log(err));

//server run
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running at http://localhost:5000");
});
