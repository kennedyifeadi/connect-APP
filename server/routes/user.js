const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ensureAuth = require("../middlewares/ensureAuth.js");
const authLayout = "../views/layouts/auth.ejs";

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  }
});

const upload = multer({ storage });

router.get("/update", ensureAuth, (req, res) => {
  const locals = {
    title: "connect || Update Page",
    description: "Update profile to continue to the website"
  };
  res.render("auth/update", {
    layout: authLayout,
    locals
  });
});

router.post(
  "/update",
  ensureAuth,
  upload.single("profilepicture"),
  async (req, res) => {
    const userId = req.userId;
    const { firstname, lastname, displayname } = req.body;
    const interests = ["playing", "singing", "dancing", "reading"];
    try {
      const update = {
        firstname: firstname,
        lastname: lastname,
        displayName: displayname,
        interests: interests
      };
      if (req.file) {
        const { url } = await cloudinary.uploader.upload(req.file.path);
        update.profilePicture = url;
      }
      await User.findByIdAndUpdate(userId, update);
      res.redirect("/home");
    } catch (error) {
      console.log(error);
      res.redirect("/user/update");
    }
  }
);

// router.put(
//   "/edit-post/:id",
//   ensureAdminAuth,
//   upload.single("thumbnail"),
//   async (req, res) => {
//     try {
//       let slug = req.params.id;
//       postUpdate = {
//         title: req.body.title,
//         description: req.body.description,
//         body: req.body.body,
//         tags: getTags(req.body),
//         updatedAt: Date.now()
//       };
//       if (req.file) {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         postUpdate.image_address = result.url;
//       }
//       await Post.findByIdAndUpdate(slug, postUpdate);

//       res.redirect(`/admin/edit-post/${req.params.id}`);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
module.exports = router;
