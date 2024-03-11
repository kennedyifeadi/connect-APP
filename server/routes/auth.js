const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authLayout = "../views/layouts/auth.ejs";
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

router.get("/signup", (req, res) => {
  const locals = {
    title: "connect || Signup Page",
    description: "Sign up to the website here"
  };
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
    console.log(token);
    res.json({
      message: "success",
      data: { email: email, password: password }
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "error", data: { error: error } });
  }
});

router.get("/login", (req, res) => {
  const locals = {
    title: "connect || Login Page",
    description: "Get back to the website here"
  };
  res.render("auth/login", {
    layout: authLayout,
    locals
  });
});

// router.post("/authenticate", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.render("auth/user_login", {
//         locals,
//         layout: authLayout
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
//     await user.updateOne({ lastLogin: Date.now() });
//     res.redirect("/home");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/user");
//   }
// });

module.exports = router;
