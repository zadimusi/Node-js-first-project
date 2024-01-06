const User = require("../model/User")

const getAllUsers = async (req,res)=>{
    const u = new User();

    return res.json({data: await User.getAllUsers(), fullName: u.getFullName()})
}

const store = async (req, res, next) => {
    const u = new User();
    let file = req.file
    const user = await u.store(req.body, file, next )
    return res.json({data:  user})
}

module.exports = {
    getAllUsers,
    store
}