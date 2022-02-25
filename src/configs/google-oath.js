const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport=require("passport")
const { v4:uuidv4 }=require("uuid") 
const User=require("../models/user.model")

passport.use(new GoogleStrategy({
    clientID: "234049782623-cmrh6kbokhgrt1h7p9cosktgjm59f0m6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:2345/auth/google/callback",
    passReqToCallback   : true
  },
 async function(request, accessToken, refreshToken, profile, done) {

    let user=await User.findOne({email:profile?.email}).lean().exec()
    
    if(!user){
    // console.log("accessToken:",accessToken, "refreshToken:",refreshToken, "profile:",profile)
        user = await User.create({
            email:profile?.email,
            password:uuidv4(),

        })
    }
    console.log("user:",user)
    return done(null, user)
  }
));

module.exports=passport;