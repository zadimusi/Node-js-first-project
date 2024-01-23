const User = require('../model/User');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtStratergy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");


passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
          try {
       
        
        //   if (!req.body.confirmPassword.includes(password)) {
        //     return done(null, {
        //       passwordMissmatched: true,
        //     });
        //   }
  
          let userWithEmail = await User.findOne({ email: email });
          if (userWithEmail) {
              return done({ message: "Email already registered" });
            }
            
        //   let userWithPhone = await User.findOne({
        //     mobileNumber: req.body.mobileNumber,
        //   });
  
        //   if (userWithPhone) {
        //     return done({ message: "Mobile number already registered" });
        //   }
          const user = await User.create({
            ...req.body,
            image:
              req?.file?.filename || "istockphoto-1337144146-612x612.jpg",
            password: await bcrypt.hash(password, 12),
            // signupType: "direct",
          });
        //   const customer = await Stripe.createStripeCustomer({
        //     email,
        //     name: req.body.fullName,
        //     phone: req.body.mobileNumber,
        //   });
        //   if (customer && customer.id) {
        //     user.stripeCustomerId = customer.id;
        //   }
        //   await user.save();
  
        //   const newUser = await User.findById({ _id: user._id }, { password: 0 });
        //   await UserNotifications.create({
        //     userId: newUser._id,
        //     title: "Welcome",
        //     description: "Welcome aboard!",
        //     type: "welcome",
        //   });
           return done(null, user);
        } catch (error) {
            console.log(error)
          done(error);
        }
      }
    )
  );

passport.use("login", new LocalStrategy({
    usernameField: 'email', // Assuming your email field is named 'email'
    passwordField: 'password'
}, async function  (email, password, done) {
  try {
    const user = await User.findOne({email: email});
    if (!user) {
            return done(null, false, { message: "User not found" });
        }

        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }
        const { refreshToken, password: userPassword, ...userWithoutSensitiveInfo } = user.toObject();
        return done(null, userWithoutSensitiveInfo, { message: "Logged in Successfully" });
    } catch (error) {
      console.log(error)
        done(error);
    }
}));


passport.use(
    new jwtStratergy(
        {
            secretOrKey: process.env.JWT_SECRET_KEY,
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


