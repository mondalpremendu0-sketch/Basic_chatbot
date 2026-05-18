const jwt = require("jsonwebtoken")
const authModel = require('../model/auth.model.js')

async function authMiddleWare(req,res,next) {
  const {token} = req.body
  
  if (!token) {
    return res.status(401).json({ message :"Unotharized .."});
  }
  try {
    const decode = await jwt.verify(token,process.env.JWT_SERECT)
    console.log(decode);
    const user = await authModel.findOne({
      _id:decode.id
    })
    req.user = user
    res.json({ decode });
    next();
  } catch (err) {
    res.status(401).json({ message :"Unotharized,invald token"});
    
  }
}

module.exports = authMiddleWare