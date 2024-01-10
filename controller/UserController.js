const User = require("../model/User")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwtStratergy = require("passport-jwt").Strategy;
const jwt = require('jsonwebtoken');
const jwtToken = require("../services/jwtTokenServices");

const getAllUsers = async (req,res)=>{
    const u = new User();

    return res.json({data: await User.getAllUsers(), fullName: u.getFullName()})
}

// const store = async (req, res, next) => {
//     try {
//         const u = new User();
//     let file = req.file
//     const user = await u.store(req.body, file )
//     return res.json({data:  user})
//     } catch (error) {
//         next(error)
//     }
// }

const login = async(req, res, next) => {
  passport.authenticate('login', {session: false}, (err, user, info) => {
            console.log(user,77)
            if (err) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user   : user
                });
            }
    
           req.login(user, {session: false}, (err) => {
               if (err) {
                   next(err);
               }
               // generate a signed son web token with the contents of user object and return it in the response
               const body = { _id: user._id, uname: user.email };
    
    			const token = jwt.sign({ user: body }, process.env.JWT_SECRET_KEY, {
    					expiresIn: "1D",
    			});
    
               return res.json({token});
            });
    
        })(req, res);
}


const signup = async (req, res) => {
    // console.log(req.body);
    // if (req.user.passwordMissmatched) {
    //   return res.status(200).json({
    //     status: false,
    //     message: "Password and confirm password are not matching!",
    //   });
    // }
  
     const body = { id: req.user._id, email: req.user.email };
  
    const { token, refereshToken, userId } = await jwtToken.getJwtTokens(
      {
         ...body,
      },
      true
    );
  
    // await upsertNotificationSettingsAndFcmTokens(req.user._id, req?.body?.fcmToken, req?.body?.deviceId);
  
    // const userData = await User.findById(req.user._id) .lean({ getters: true });
  
    // await pushNotification("welcome", req.user._id, {
    //   fullName: userData.fullName,
    // });
  
    return res.status(200).json({ status: true, userData: req.user, token, refereshToken });
  };

module.exports = {
    getAllUsers,
    // store,
    login,
    signup
}