const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const AppleStrategy = require("passport-apple");
const { google } = require("../config/keys");

const User = require("../models/User");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     // const token = jwt.sign({ Id: id }, jwtSecret);
//     // res.cookie("token", token, { httpOnly: true });
//     // await user.updateOne({ lastLogin: Date.now() });
//     done(null, user);
//   } catch (error) {
//     console.log(error);
//   }
// });
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      ...google,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      const { sub, email } = profile._json;
      console.log(sub, email);
      const user = await User.findOne({ googleID: profile.id });
      console.log(user);
      done(null, user);
      if (!user) {
        // add new user
        const newUser = new User({
          googleId: sub,
          email: email
        });
        const newuser = await newUser.save();
        done(null, newuser);
      } else {
      done(null, user);
      }
    }

    // const { sub, email, name, family_name, given_name, picture } =
    //   profile._json;
    // try {
    //   let user = await User.findOne({ googleId: sub });
    //   if (!user) {
    //     try {
    //       user = await User.findOne({ email: email });
    //       if (!user) {
    //         try {
    //           const userInfo = new User({
    //             googleId: sub,
    //             firstname: given_name,
    //             lastname: family_name,
    //             displayName: name,
    //             profilePicture: picture,
    //             email: email
    //           });
    //           const newUser = await userInfo.save();
    //           console.log(newUser);
    //           done(null, newUser);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   } else {
    //     console.log(user);
    //   }
    //   // newUser = new User(newUser);
    //   // console.log(newUser);
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   let user = await User.findOne({ googleId: sub });
    //   if (!user) {
    //     user = await User.findOne({ email: email });
    //     if (!user) {
    //       newUser = await User.create(newUser);
    //       console.log(newUser);
    //       done(null, newUser);
    //     } else {
    //       newUser = await user.updateOne({ googleId: sub });
    //       console.log(newUser);
    //       done(null, newUser);
    //     }
    //   } else {
    //     console.log(user);
    //     done(null, user);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  )
);
