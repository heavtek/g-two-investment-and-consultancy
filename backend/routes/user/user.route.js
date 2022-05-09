const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usersModel = require('../../models/user/user.model');

router.get('/user',(req,res)=>{
   usersModel.find({},(error,data)=>{
       if(error) return res.status(404).send("Data not found");
       res.status(200).send(data);
   })
})

router.get('/user/:id',(req,res)=>{
   usersModel.findOne({_id:req.params.id},(error,data)=>{
       if(error) return res.status(404).send("Somethin Went Wrong");
       res.status(200).send(data);
   })
 })

  router.get('/get-single-data/:email',async (req,res)=>{
    try{
      const userFound = await usersModel.findOne({userEmail:req.params.email});
      res.status(200).send(userFound);
    }catch(e){
      res.status(400).send(e.message)
    }
  })
  
  
router.put('/reset-password/:email',(req,res,next)=>{
  let userData={};
  usersModel.findOne({email:req.params.email},(error,data)=>{
      userData=data;
  })
  const  saltRounds = 10;
   const plainTextPassword = req.body.userPassword;
   bcrypt.hash(plainTextPassword,saltRounds,(error,hashedPassword)=>{
       if(error) return res.status(500).send("Internal Server Error");
      if(userData){
          console.log(userData)
          userData.userPassword = hashedPassword;
          usersModel.findOneAndUpdate({_id:userData._id},userData,(error,data)=>{
             if(error) return res.status(500).send("Unable to reset the password!!!")
             res.status(200).send("Password updated successfully!!")
          })
      }
   })
  usersModel.findOneAndUpdate({_id:userData._id},)
})
 router.post('/user',(req,res)=>{
   const saltRounds = 10;
   const plainTextPassword = req.body.userPassword;
    bcrypt.hash(plainTextPassword,saltRounds,(error,hashedPassword)=>{
      req.body.userPassword = hashedPassword;
      usersModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Invalid data");
        res.status(201).send("users Created Successfully");
    })
    })
 })

 router.put('/user/:id',(req,res,next)=>{
   const plainTextPassword = req.body.userPassword;
   const saltRounds = 10;
   bcrypt.hash(plainTextPassword,saltRounds,(error,hashedPassword)=>{
     req.body.userPassword = hashedPassword;
    usersModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(400).send("Unable to update");
      res.status(200).send("Updated successfully!!")
  })
   })
 })

 router.delete('/user/:id',(req,res)=>{
   usersModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(500).send("Something went wrong");
     res.status(200).send("Deleted successfully");
   })
 })

 module.exports = router;