const express = require('express');

const router = express.Router();
const businessModel = require('../../../models/service/business/business.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/business-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/business',(req,res,next)=>{
  businessModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/business/:id',(req,res,next)=>{
    businessModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/business/:id',upload.array('businessImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const reqFiles = [];
    const url = req.protocol +'://' +req.get('host');
   for (var i = 0; i < req.files.length; i++) {
       reqFiles.push(url + '/business-images/' + req.files[i].filename)
   }
   if(!regex.test(req.body.businessImage)){
    const businessData = {
        aboutBusinessConsultency:req.body.aboutBusinessConsultency,
        businessTitle : req.body.businessTitle,
        description : req.body.description,
        businessImage: reqFiles,
        description : req.body.description
    }
       businessModel.findByIdAndUpdate({_id:req.params.id},businessData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     businessModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/business',upload.array('businessImage'),(req,res,next)=>{
    const reqFiles=[];
 const url = req.protocol +'://' +req.get('host');
 for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + '/business-images/' + req.files[i].filename)
  }
  const businessData = {
    aboutBusinessConsultency:req.body.aboutBusinessConsultency,
    businessTitle : req.body.businessTitle,
    description : req.body.description,
    businessImage: reqFiles,
    description : req.body.description
   }
    businessModel.create(businessData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/business/:id',(req,res)=>{
 businessModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;