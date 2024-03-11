const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.redirect("/auth/signup");
});


module.exports = router;