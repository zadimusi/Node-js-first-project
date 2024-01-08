const express = require("express");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const { getAllUsers, store  } = require("../controller/UserController");
const multerInstance = require('../helper/multer/multer');

const router = express.Router();

router.post('/login', function (req, res, next) {
    passport.authenticate('login', {session: false}, (err, user, info) => {
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

			const token = jwt.sign({ user: body }, "TOP_SECRET", {
					expiresIn: "1D",
			});

           return res.json({token});
        });

    })(req, res);
});

router.use(passport.authenticate("jwt", { session: false }))

router.get('/users',getAllUsers)
router.post('/users', multerInstance.single('image'),store)

module.exports = router