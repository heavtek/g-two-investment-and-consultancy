const express = require('express');

const router = express.Router();
const aboutusModel = require('../../models/aboutus/aboutus.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/aboutus-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/aboutus',(req,res,next)=>{
  aboutusModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/aboutus/:id',(req,res,next)=>{
    aboutusModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/aboutus/:id',upload.single('aboutusImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
   if(!regex.test(req.body.aboutusImage)){
    const url = req.protocol +'://' +req.get('host');
    const fileName = req.file.filename.toLowerCase().split(' ').join('-');
    const aboutusData = {
        aboutusDescription:req.body.aboutusDescription,
        ourMission : req.body.ourMission,
        ourValues : req.body.ourValues,
        ourVision : req.body.ourVision,
        businessApproach: req.body.businessApproach,
        makeUsDifferent :req.body.makeUsDifferent,
        aboutusImage: url+'/aboutus-images/'+ fileName
    }
       aboutusModel.findByIdAndUpdate({_id:req.params.id},aboutusData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     aboutusModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/aboutus',upload.single('aboutusImage'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const fileName = req.file.filename.toLowerCase().split(' ').join('-');
 const aboutusData = {
     aboutusDescription:req.body.aboutusDescription,
     ourMission : req.body.ourMission,
     ourValues : req.body.ourValues,
     ourVision : req.body.ourVision,
     businessApproach: req.body.businessApproach,
        makeUsDifferent :req.body.makeUsDifferent,

     aboutusImage: url+'/aboutus-images/'+ fileName
   
 }
    aboutusModel.create(aboutusData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/aboutus/:id',(req,res)=>{
 aboutusModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;