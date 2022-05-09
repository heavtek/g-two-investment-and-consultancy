const express = require('express');

const router = express.Router();
const formativeModel = require('../../../models/service/formative/formative.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/formative-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/formative',(req,res,next)=>{
  formativeModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/formative/:id',(req,res,next)=>{
    formativeModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/formative/:id',upload.array('formativeImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const reqFiles = [];
    const url = req.protocol +'://' +req.get('host');
   for (var i = 0; i < req.files.length; i++) {
       reqFiles.push(url + '/formative-images/' + req.files[i].filename)
   }
   if(!regex.test(req.body.formativeImage)){
    const formativeData = {
        aboutformativeConsultency:req.body.aboutformativeConsultency,
        formativeTitle : req.body.formativeTitle,
        description : req.body.description,
        formativeImage: reqFiles,
        description : req.body.description
    }
       formativeModel.findByIdAndUpdate({_id:req.params.id},formativeData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     formativeModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/formative',upload.array('formativeImage'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const reqFiles = [];
 for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/formative-images/' + req.files[i].filename)
  }
  const formativeData = {
    aboutformativeConsultency:req.body.aboutformativeConsultency,
    formativeTitle : req.body.formativeTitle,
    description : req.body.description,
    formativeImage: reqFiles,
    description : req.body.description
   }
    formativeModel.create(formativeData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/formative/:id',(req,res)=>{
 formativeModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;