const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const AppleStrategy = require("passport-apple");

passport.use(
    new GoogleStrategy({
    // Options for the strategy
}), ()=>{
    // Passport Callback Option
});



passport.use(
    new FacebookStrategy({
    // Options for the strategy
}), ()=>{
    // Passport Callback Option
});