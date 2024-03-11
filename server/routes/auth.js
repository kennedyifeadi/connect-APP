const express = require("express");
const router = express.Router();;
const User = require("../models/User");
const authLayout = "../views/layouts/auth.ejs";
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

router.get("/signup", (req, res)=>{
    const locals = {
        title: "connect || Signup Page",
        description: "Sign up to the website here"
    }
    res.render("auth/signup", {
        layout: authLayout,
        locals
    });
});

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.create({
            email: email,
            password: password
        });

        const token = jwt.sign({ Id: user.id }, jwtSecret);
        res.cookie("token", token, { httpOnly: true });
        console.log(token);
        res.json({message: "success", data: {email: email, password: password}});
    } catch (error) {
        console.log(error);
        res.json({message: "error", data: {error: error}});
    }
});

router.get("/login",  (req, res)=>{
    const locals = {
        title: "connect || Login Page",
        description: "Get back to the website here"
    }
    res.render("auth/login", {
        layout: authLayout,
        locals
    });
});


module.exports = router;