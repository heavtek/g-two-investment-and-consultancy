const express = require('express');

const router = express.Router();
const investmentModel = require('../../../models/service/investment/investment.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/investment-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/investment',(req,res,next)=>{
  investmentModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/investment/:id',(req,res,next)=>{
    investmentModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/investment/:id',upload.array('investmentImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const reqFiles = [];
    const url = req.protocol +'://' +req.get('host');
    if(!regex.test(req.body.investmentImage)){
          for (var i = 0; i < req.files.length; i++) {
                reqFiles.push(url + '/investment-images/' + req.files[i].filename)
              }
            }
       
   if(!regex.test(req.body.investmentImage)){
    const investmentData = {
        aboutinvestmentConsultency:req.body.aboutinvestmentConsultency,
        investmentTitle : req.body.investmentTitle,
        description : req.body.description,
        investmentImage: reqFiles,
        description : req.body.description
    }
       investmentModel.findByIdAndUpdate({_id:req.params.id},investmentData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     investmentModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/investment',upload.array('investmentImage'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const reqFiles=[];
 if(Array.isArray(req.files)){
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/investment-images/' + req.files[i].filename)
      }
 }else{

 }
  const investmentData = {
    aboutinvestmentConsultency:req.body.aboutinvestmentConsultency,
    investmentTitle : req.body.investmentTitle,
    description : req.body.description,
    investmentImage: reqFiles,
    description : req.body.description
   }
    investmentModel.create(investmentData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/investment/:id',(req,res)=>{
 investmentModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;