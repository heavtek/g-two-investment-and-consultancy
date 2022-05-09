const express = require('express');

const router = express.Router();
const teamModel = require('../../models/team/team.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/team-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/team',(req,res,next)=>{
  teamModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/team/:id',(req,res,next)=>{
    teamModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/team/:id',upload.single('memberImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const url = req.protocol +'://' +req.get('host');
   
   if(!regex.test(req.body.memberImage)){
    const teamData = {
        memberName:req.body.memberName,
        memberRole: req.body.memberRole,
        memberImage:url+'/team-images/'+fileName ,
        description:req.body.description
       }

       teamModel.findOneAndUpdate({_id:req.params.id},teamData,(error,data)=>{
        if(error) return res.status(400).send("Can't Update Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     teamModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/team',upload.single('memberImage'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const fileName = req.file.filename.toLowerCase().split(' ').join('-');
  const teamData = {
    memberName:req.body.memberName,
    memberRole: req.body.memberRole,
    memberImage:url+'/team-images/'+fileName ,
    description:req.body.description
   }
    teamModel.create(teamData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/team/:id',(req,res)=>{
 teamModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;