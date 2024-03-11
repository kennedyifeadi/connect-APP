const express = require("express");
const router = express.Router();
const ensureAuth = require("../middlewares/ensureAuth.js");
const authLayout = "../views/layouts/auth.ejs";

router.get("/update", ensureAuth, (req, res) => {
    const locals = {
      title: "connect || Update Page",
      description: "Update profile to continue to the website"
    };
    console.log(req.userId);
    res.render("auth/update", {
      layout: authLayout,
      locals
    });
  });

  
module.exports = router;