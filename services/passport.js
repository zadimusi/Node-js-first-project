const User = require('../model/User');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtStratergy = require("passport-jwt").Strategy;

passport.use("login", new LocalStrategy({
    usernameField: 'email', // Assuming your email field is named 'email'
    passwordField: 'password'
}, async function  (email, password, done) {
    try {
        const user = await User.findOne({email: email});

        if (!user) {
            return done(null, false, { message: "User not found" });
        }

        const validate = await User.findOne({password: password});

        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        done(error);
    }
}));


passport.use(
    new jwtStratergy(
        {
            secretOrKey: "TOP_SECRET",
            // jwtFromRequest: extractJwt.fromUrlQueryParameter("secret_token"),
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
        },
        (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);


