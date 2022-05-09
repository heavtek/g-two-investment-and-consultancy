const express = require('express');

const router = express.Router();
const testimonalModel = require('../../models/testimonals/testimonals.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/testimonal-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/testimonal',(req,res,next)=>{
  testimonalModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/testimonal/:id',(req,res,next)=>{
    testimonalModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/testimonal/:id',upload.single('testimonalImage'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const url = req.protocol +'://' +req.get('host');
   
   if(!regex.test(req.body.memberImage)){
       const testimonalData = {
        testimonalDescription:req.body.testimonalDescription,
        date: req.body.date,
        testimonalName: req.body.testimonalName,
        testimonalImage:url+'/testimonal-images/'+fileName ,
       }
     
       testimonalModel.findOneAndUpdate({_id:req.params.id},testimonalData,(error,data)=>{
        if(error) return res.status(400).send("Can't Update Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     testimonalModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/testimonal',upload.single('testimonalImage'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const fileName = req.file.filename.toLowerCase().split(' ').join('-');
  const testimonalData = {
    testimonalDescription:req.body.testimonalDescription,
    date: req.body.date,
    testimonalName: req.body.testimonalName,
    testimonalImage:url+'/testimonal-images/'+fileName ,
   }
    testimonalModel.create(testimonalData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/testimonal/:id',(req,res)=>{
 testimonalModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;