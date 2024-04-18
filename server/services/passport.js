const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const AppleStrategy = require("passport-apple");
const { google } = require("../keys");

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: google.clientID,
        clientSecret: google.clientSecret,
        callbackURL: "/auth/google/callback"
    }, () => {
        // passport callback function
    })
);