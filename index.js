require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passportSetUp = require("./server/services/passport");

const connectDB = require("./server/config/db");


const app = express();
const PORT = process.env.PORT || 8080;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
      }),
      cookie: { 
          maxAge: 1209600000,
          secure: true
      }
    })
  );
  
app.use(express.static("public"));

// Templating Engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/user", require("./server/routes/user"));
app.use("/auth", require("./server/routes/auth"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});