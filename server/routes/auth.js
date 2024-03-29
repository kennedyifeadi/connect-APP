const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authLayout = "../views/layouts/auth.ejs";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecret = process.env.JWT_SECRET;

router.get("/signup", (req, res) => {
  const locals = {
    title: "connect || Signup Page",
    description: "Sign up to the website here"
  };
  const error = req.query.error;
  if (error == 409) {
    locals.error = "Account already exists";
  } else if (error == 500) {
    locals.error = "Internal server error, Try again!";
  }
  res.render("auth/signup", {
    layout: authLayout,
    locals
  });
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({
      email: email,
      password: password
    });

    const token = jwt.sign({ Id: user.id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/user/update");
  } catch (error) {
    if (error.code === 11000) {
      res.status(409);
      res.redirect("/auth/signup?error=409");
    } else {
      res.status(500);
      res.redirect("/auth/signup?error=500");
    }
  }
});

router.get("/login", (req, res) => {
  const locals = {
    title: "connect || Login Page",
    description: "Get back to the website here"
  };
  const error = req.query.error;
  if (error == 409) {
    locals.error = "Check your email and password and try again";
  } else if (error == 500) {
    locals.error = "Internal server error, Try again!";
  }
  res.render("auth/login", {
    layout: authLayout,
    locals
  });
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).redirect("/auth/login?error=409");
    }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(409).redirect("/auth/login?error=409");
    }

    const token = jwt.sign({ Id: user.id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    await user.updateOne({ lastLogin: Date.now() });
    res.redirect("/user/update");
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
});

module.exports = router;

// router.post("/user/login", async (req, res) => {
//   try {
//     const locals = {
//       title: "Login || CurioCraze",
//       description: "Login Authentication for users | CurioCraze"
//     };
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });

//     if (!user) {
//       return res.render("auth/user_login", {
//         locals,
//         layout: authLayout,
//         invalid: true
//       });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.render("auth/user_login", {
//         locals,
//         layout: authLayout,
//         invalid: true
//       });
//     }

//     const token = jwt.sign({ userId: user.id }, jwtSecret);
//     res.cookie("user_token", token, { httpOnly: true });
//     await user.updateOne({lastLogin: Date.now()});
//     res.redirect("/home");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/user");
//   }
// });