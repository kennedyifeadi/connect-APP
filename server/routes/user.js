const express = require("express");
const router = express.Router();
const authLayout = "../views/layouts/auth.ejs";

router.get("/update", (req, res) => {
    const locals = {
      title: "connect || Update Page",
      description: "Update profile to continue to the website"
    };
    res.render("auth/update", {
      layout: authLayout,
      locals
    });
  });
module.exports = router;