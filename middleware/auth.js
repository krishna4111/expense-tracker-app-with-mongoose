const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const user = jwt.verify(token, "secretkey");
  const userDetail=await  User.findById(user.userId);
      req.user = userDetail;
      next();
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
};
//module.exports=authentication;
