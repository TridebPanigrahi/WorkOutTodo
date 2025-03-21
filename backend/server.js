require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workOutRouter = require("./routes/workout");

// express app

const app = express();

//middleware

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workout", workOutRouter);
// app.get("/", (req, res) => {
//   res.json({ mess: "welcome to the app" });
// });

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & Lishing on Port`, process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
