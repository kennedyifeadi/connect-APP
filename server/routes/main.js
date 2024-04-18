const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/ensureAuth.js");


router.get("/", (req, res)=>{
    res.redirect("/home");
});

router.get("/home", ensureAuth, (req, res)=>{
    res.send("Welcome")
});
module.exports = router;