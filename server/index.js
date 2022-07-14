const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const userSchema = require("./userSchema");
const path = require("path");
app.use(express.json());
app.use(cors());

// ***************************************
mongoose
  .connect("mongodb://localhost:27017/userbase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection running..");
  })
  .catch((err) => {
    console.log("Uh Oh, something went wrong!");
    console.log(err);
  });
// ****************************************

app.post("/signup", async (req, res) => {
  console.log("hello dear");
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const user = new userSchema({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
  try {
    await user.save();
    res.send({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    console.log("Data inserted Successfully into database using post ):");
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      res.send({ err: "Email should be unique", errCode: 11000 });
    } else {
      console.log(err);
    }

    console.log(err.name, " ", err.code);
  }
});

app.get("/*", function (req, res) {
  res.send("Hello, It's get from express ):");
  console.log(req);
});

app.listen(3001, () => {
  console.log("Server is running...! on port: 3001");
});
