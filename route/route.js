const express = require("express");
const { getAllUsers, store  } = require("../controller/UserController");
const multerInstance = require('../helper/multer/multer')

const router = express.Router();

router.get('/users',getAllUsers)
router.post('/users', multerInstance.single('image'),store)

module.exports = router