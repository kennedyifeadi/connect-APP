const express = require("express");
const router = express.Router();
const authLayout = "../views/layouts/auth.ejs"

router.get("/", (req, res)=>{
    const locals = {
        title: "connect || Signup Page",
        description: "Sign up to the website here"
    }
    res.render("auth/signup", {
        layout: authLayout,
        locals
    });
});
module.exports = router;