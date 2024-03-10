const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome to Authentication")
});
module.exports = router;