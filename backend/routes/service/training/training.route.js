const express = require('express');

const router = express.Router();
const trainingModel = require('../../../models/service/training/training.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/training-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/training',(req,res,next)=>{
  trainingModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/training/:id',(req,res,next)=>{
    trainingModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/training/:id',upload.array('trainingImages'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const reqFiles = [];
    const url = req.protocol +'://' +req.get('host');
   for (var i = 0; i < req.files.length; i++) {
       reqFiles.push(url + '/training-images/' + req.files[i].filename)
   }
   if(!regex.test(req.body.trainingImage)){
    const trainingData = {
        abouttrainingConsultency:req.body.abouttrainingConsultency,
        trainingTitle : req.body.trainingTitle,
        description : req.body.description,
        trainingImages: reqFiles,
        description : req.body.description
    }
       trainingModel.findByIdAndUpdate({_id:req.params.id},trainingData,(error,data)=>{
        if(error) return res.status(400).send("Can't Update Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     trainingModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/training',upload.array('trainingImages'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const reqFiles=[];
 console.log(req.files);
 for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/training-images/' + req.files[i].filename)
  }
  const trainingData = {
    abouttrainingConsultency:req.body.abouttrainingConsultency,
    trainingTitle : req.body.trainingTitle,
    description : req.body.description,
    trainingImages: reqFiles,
   }
    trainingModel.create(trainingData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/training/:id',(req,res)=>{
 trainingModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;