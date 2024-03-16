const express = require("express");
const mongoose = require("mongoose");
const PORT_config = require("./config/port.config.js");
const db_config = require("./config/db.config.js");
// const { findOne } = require("./models/user.model.js");
const user_model = require("./models/user.model.js");
const bcrypt = require("bcryptjs");
/**Create server */
const app = express();

//convert the JSON data into javascript object so we used middleware here

app.use(express.json())



//MongoDB connection

mongoose.connect(db_config.DB_URI);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Database connection fail");
});

db.once("open", () => {
  console.log("Database connected");
  init();
});

async function init() {
  try {
    let user = await user_model.findOne({ userId: "Admin" });
    if (user) {
      console.log("Admin already exist");
      return;
    }

    try {
     user =  await user_model.create({
        name: "Diksha",
        userId: "Admin",
        email: "uniquedikshagupta02@gmail.com",
        userType: "Admin",
        password: bcrypt.hashSync("diksha1", 8),
      });
      console.log("Admin created successfully", user);
    } catch (error) {
      console.log("Admin is not created",error);
    }
  } catch (error) {
    console.log("Error while reading the data");
  }
}

//stich router to app

require('./route/auth.route.js')(app)
app.listen(PORT_config.PORT, () => {
    console.log(`Server is created at ${PORT_config.PORT}`);
  });