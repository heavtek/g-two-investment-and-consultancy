const express  = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../../models/user/user.model');
const router = express.Router();
router.post('/login',async (req,res)=>{
  const userData = await userModel.findOne({userEmail:req.body.userEmail});
  console.log(userData);
  if(!userData) return res.status(404).send(userData);
  const validPassword = await bcrypt.compare(req.body.userPassword,userData.userPassword);
  if(!validPassword) return res.status(400).send(validPassword);
  const accessToken = jwt.sign({_id:userData._id},process.env.SECRET_KEY);
    res.status(200).send(accessToken); 
})

module.exports = router;